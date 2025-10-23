"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useSWRMutation from "swr/mutation";
import { set, get, del, keys, createStore } from "idb-keyval";

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

const generateKey = () =>
  `sync-${Date.now()}-${Math.random().toString(36).slice(2)}`;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ✅ Safe version of useDiscoverSync
export function useDiscoverSync(plugId?: string) {
  // 🧩 Guard: if no plugId yet, return dummy handlers
  if (!plugId) {
    return {
      recordSwipeRight: () => {},
      recordSwipeLeft: () => {},
      syncPending: { current: false },
      sync: async () => {},
      isSyncing: false,
      lastSynced: 0,
      hasChanges: false,
    };
  }

  // ✅ Create store tied to this plugId
  const discoverStore = useRef(
    createStore(`pluggn-discover-sync-${plugId}`, "sync-store")
  ).current;

  const [accepted, setAccepted] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [swipesCount, setSwipesCount] = useState(0);
  const [lastSynced, setLastSynced] = useState(0);

  const lastSyncedData = useRef<SyncPayload>({
    accepted: [],
    rejected: [],
    swipesCount: 0,
  });

  const syncPending = useRef(false);

  const { trigger, isMutating } = useSWRMutation(
    "/api/discover/sync",
    syncFetcher
  );

  const hasChanges =
    accepted.length > 0 || rejected.length > 0 || swipesCount > 0;

  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((x, i) => x === b[i]);

  const queueSync = async (payload: SyncPayload) => {
    if (
      payload.accepted.length === 0 &&
      payload.rejected.length === 0 &&
      payload.swipesCount === 0
    )
      return;
    const key = generateKey();
    await set(key, payload, discoverStore);
    console.log(`🕓 [${plugId}] Queued sync:`, payload);
  };

  const hasPendingSyncs = async () => {
    const pending = await keys(discoverStore);
    return pending.length > 0;
  };

  const processQueuedSyncs = async () => {
    const allKeys = await keys(discoverStore);
    for (const key of allKeys) {
      const data = await get(key, discoverStore);
      if (!data) continue;
      try {
        await trigger(data);
        await del(key, discoverStore);
        console.log(`✅ [${plugId}] Processed queued sync:`, data);
      } catch (err) {
        console.error(`❌ [${plugId}] Failed queued sync:`, err);
        break;
      }
    }
  };

  const sync = useCallback(async () => {
    if (syncPending.current) {
      console.log("⚠️ Sync skipped — already in progress");
      return;
    }

    syncPending.current = true;
    try {
      const pendingExists = await hasPendingSyncs();

      const changed =
        !arraysEqual(accepted, lastSyncedData.current.accepted) ||
        !arraysEqual(rejected, lastSyncedData.current.rejected) ||
        swipesCount !== lastSyncedData.current.swipesCount;

      if (!changed && !pendingExists) return;

      if (pendingExists) await processQueuedSyncs();

      if (changed && hasChanges) {
        const acceptedChunks = chunkArray(accepted, 20);
        const rejectedChunks = chunkArray(rejected, 20);

        console.log(
          `📦 [${plugId}] Sending ${acceptedChunks.length} accepted batches and ${rejectedChunks.length} rejected batches`
        );

        for (
          let i = 0;
          i < Math.max(acceptedChunks.length, rejectedChunks.length);
          i++
        ) {
          const batch: SyncPayload = {
            accepted: acceptedChunks[i] || [],
            rejected: rejectedChunks[i] || [],
            swipesCount: i === 0 ? swipesCount : 0,
            timestamp: Date.now(),
          };

          try {
            await trigger(batch);
            console.log(`✅ [${plugId}] Batch synced:`, batch);
          } catch (err) {
            console.error(`❌ [${plugId}] Batch sync failed:`, err);
            await queueSync(batch);
          }
        }

        lastSyncedData.current = {
          accepted: [...accepted],
          rejected: [...rejected],
          swipesCount,
        };
        setAccepted([]);
        setRejected([]);
        setSwipesCount(0);
        setLastSynced(Date.now());
      }
    } catch (err) {
      console.error(`❌ [${plugId}] Discover sync failed:`, err);
      await queueSync({
        accepted,
        rejected,
        swipesCount,
        timestamp: Date.now(),
      });
    } finally {
      syncPending.current = false;
    }
  }, [accepted, rejected, swipesCount, hasChanges, trigger, plugId]);

  // 🕒 Debounced inactivity sync
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (!hasChanges) return;
    inactivityTimer.current = setTimeout(() => {
      console.log(`⌛ [${plugId}] Auto sync after inactivity`);
      sync();
    }, 3000);
  }, [sync, hasChanges, plugId]);

  useEffect(() => {
    if (hasChanges) resetInactivityTimer();
  }, [accepted, rejected, swipesCount, hasChanges, resetInactivityTimer]);

  useEffect(() => {
    const handleOnline = () => {
      console.log(`🌐 [${plugId}] Back online — syncing queued data...`);
      sync();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [sync, plugId]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!hasChanges) return;
      navigator.sendBeacon(
        "/api/discover/sync",
        JSON.stringify({ accepted, rejected, swipesCount })
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && hasChanges) sync();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sync, hasChanges, accepted, rejected, swipesCount]);

  // 🫱 Swipe recorders
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
    syncPending,
    sync,
    isSyncing: isMutating,
    lastSynced,
    hasChanges,
  };
}
