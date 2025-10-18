"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useSWRMutation from "swr/mutation";
import { set, get, del, keys } from "idb-keyval";

interface SyncPayload {
  accepted: string[];
  rejected: string[];
  swipesCount: number;
  timestamp?: number;
}

async function syncFetcher(url: string, { arg }: { arg: SyncPayload }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to sync discover data");
  return res.json();
}

// Utility to generate a unique key for queued syncs
const generateKey = () =>
  `sync-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function useDiscoverSync() {
  const [accepted, setAccepted] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [swipesCount, setSwipesCount] = useState(0);
  const [lastSynced, setLastSynced] = useState(0);

  const { trigger, isMutating } = useSWRMutation(
    "/api/discover/sync",
    syncFetcher
  );

  const hasChanges =
    accepted.length > 0 || rejected.length > 0 || swipesCount > 0;

  // --- Store sync in IndexedDB if offline or failed ---
  const queueSync = async (payload: SyncPayload) => {
    if (
      payload.accepted.length === 0 &&
      payload.rejected.length === 0 &&
      payload.swipesCount === 0
    )
      return;

    const key = generateKey();
    await set(key, payload);
    console.log("🕓 Queued sync:", payload);
  };

  // --- Check if any pending syncs exist ---
  const hasPendingSyncs = async () => {
    const pending = await keys();
    return pending.length > 0;
  };

  // --- Process queued syncs ---
  const processQueuedSyncs = async () => {
    const allKeys = await keys();
    for (const key of allKeys) {
      const data = await get(key);
      if (!data) continue;
      try {
        await trigger(data);
        await del(key);
        console.log("✅ Processed queued sync:", data);
      } catch (err) {
        console.error("❌ Failed queued sync:", err);
        // Stop here; keep remaining for next retry
        break;
      }
    }
  };

  // --- Sync function ---
  const sync = useCallback(async () => {
    const pendingExists = await hasPendingSyncs();
    if (!hasChanges && !pendingExists) return;

    try {
      await processQueuedSyncs();

      if (hasChanges) {
        const payload: SyncPayload = {
          accepted,
          rejected,
          swipesCount,
          timestamp: Date.now(),
        };
        await trigger(payload);
        setAccepted([]);
        setRejected([]);
        setSwipesCount(0);
        setLastSynced(Date.now());
        console.log("✅ Discover sync successful");
      }
    } catch (err) {
      console.error("❌ Discover sync failed:", err);
      await queueSync({
        accepted,
        rejected,
        swipesCount,
        timestamp: Date.now(),
      });
    }
  }, [accepted, rejected, swipesCount, hasChanges, trigger]);

  // --- Inactivity debounce (sync after 10s of no swipes) ---
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      sync();
    }, 10000);
  }, [sync]);

  useEffect(() => {
    if (hasChanges) resetInactivityTimer();
  }, [accepted, rejected, swipesCount, hasChanges, resetInactivityTimer]);

  // --- Sync on reconnect (when back online) ---
  useEffect(() => {
    const handleOnline = () => {
      console.log("🌐 Back online — syncing queued data...");
      sync();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [sync]);

  // --- Sync on tab close / page reload ---
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!hasChanges) return;
      navigator.sendBeacon(
        "/api/discover/sync",
        JSON.stringify({ accepted, rejected, swipesCount })
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") sync();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sync, accepted, rejected, swipesCount, hasChanges]);

  // --- Record swipe events ---
  const recordSwipeRight = (id: string) => {
    setAccepted((prev) => [...prev, id]);
    setSwipesCount((prev) => prev + 1);
    resetInactivityTimer();
  };

  const recordSwipeLeft = (id: string) => {
    setRejected((prev) => [...prev, id]);
    setSwipesCount((prev) => prev + 1);
    resetInactivityTimer();
  };

  return {
    recordSwipeRight,
    recordSwipeLeft,
    sync,
    isSyncing: isMutating,
    lastSynced,
    hasChanges,
  };
}
