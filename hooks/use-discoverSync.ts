// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import useSWRMutation from "swr/mutation";
// import { set, get, del, keys } from "idb-keyval";

// interface SyncPayload {
//   accepted: string[];
//   rejected: string[];
//   swipesCount: number;
//   timestamp?: number;
// }

// async function syncFetcher(url: string, { arg }: { arg: SyncPayload }) {
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(arg),
//     credentials: "include",
//   });
//   if (!res.ok) throw new Error("Failed to sync discover data");
//   return res.json();
// }

// const generateKey = () =>
//   `sync-${Date.now()}-${Math.random().toString(36).slice(2)}`;

// export function useDiscoverSync() {
//   const [accepted, setAccepted] = useState<string[]>([]);
//   const [rejected, setRejected] = useState<string[]>([]);
//   const [swipesCount, setSwipesCount] = useState(0);
//   const [lastSynced, setLastSynced] = useState(0);

//   // Track last synced snapshot to detect changes
//   const lastSyncedData = useRef<SyncPayload>({
//     accepted: [],
//     rejected: [],
//     swipesCount: 0,
//   });

//   const { trigger, isMutating } = useSWRMutation(
//     "/api/discover/sync",
//     syncFetcher
//   );

//   const hasChanges =
//     accepted.length > 0 || rejected.length > 0 || swipesCount > 0;

//   // --- Helper to compare arrays shallowly ---
//   const arraysEqual = (a: string[], b: string[]) =>
//     a.length === b.length && a.every((x, i) => x === b[i]);

//   // --- Store sync in IndexedDB if offline or failed ---
//   const queueSync = async (payload: SyncPayload) => {
//     if (
//       payload.accepted.length === 0 &&
//       payload.rejected.length === 0 &&
//       payload.swipesCount === 0
//     )
//       return;

//     const key = generateKey();
//     await set(key, payload);
//     console.log("🕓 Queued sync:", payload);
//   };

//   const hasPendingSyncs = async () => {
//     const pending = await keys();
//     return pending.length > 0;
//   };

//   const processQueuedSyncs = async () => {
//     const allKeys = await keys();
//     for (const key of allKeys) {
//       const data = await get(key);
//       if (!data) continue;
//       try {
//         await trigger(data);
//         await del(key);
//         console.log("✅ Processed queued sync:", data);
//       } catch (err) {
//         console.error("❌ Failed queued sync:", err);
//         break; // keep remaining for next retry
//       }
//     }
//   };
//   // --- Main sync function ---
//   const sync = useCallback(async () => {
//     const pendingExists = await hasPendingSyncs();

//     const changed =
//       !arraysEqual(accepted, lastSyncedData.current.accepted) ||
//       !arraysEqual(rejected, lastSyncedData.current.rejected) ||
//       swipesCount !== lastSyncedData.current.swipesCount;

//     // ⛔ Skip if no new changes and no pending syncs
//     if (!changed && !pendingExists) return;

//     try {
//       // process queued syncs first
//       if (pendingExists) await processQueuedSyncs();

//       if (changed && hasChanges) {
//         const payload: SyncPayload = {
//           accepted,
//           rejected,
//           swipesCount,
//           timestamp: Date.now(),
//         };

//         await trigger(payload);

//         // Update last synced snapshot
//         lastSyncedData.current = {
//           accepted: [...accepted],
//           rejected: [...rejected],
//           swipesCount,
//         };

//         // reset current state
//         setAccepted([]);
//         setRejected([]);
//         setSwipesCount(0);
//         setLastSynced(Date.now());
//         console.log("✅ Discover sync successful");
//       }
//     } catch (err) {
//       console.error("❌ Discover sync failed:", err);
//       await queueSync({
//         accepted,
//         rejected,
//         swipesCount,
//         timestamp: Date.now(),
//       });
//     }
//   }, [accepted, rejected, swipesCount, hasChanges, trigger]);

//   // --- Debounce inactivity sync ---
//   const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
//   const resetInactivityTimer = useCallback(() => {
//     if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
//     if (!hasChanges) return;
//     inactivityTimer.current = setTimeout(() => sync(), 10000);
//   }, [sync, hasChanges]);

//   useEffect(() => {
//     if (hasChanges) resetInactivityTimer();
//   }, [accepted, rejected, swipesCount, hasChanges, resetInactivityTimer]);

//   // --- Sync on reconnect ---
//   useEffect(() => {
//     const handleOnline = () => {
//       console.log("🌐 Back online — syncing queued data...");
//       sync();
//     };
//     window.addEventListener("online", handleOnline);
//     return () => window.removeEventListener("online", handleOnline);
//   }, [sync]);

//   // --- Sync on tab close / hide ---
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       if (!hasChanges) return;
//       navigator.sendBeacon(
//         "/api/discover/sync",
//         JSON.stringify({ accepted, rejected, swipesCount })
//       );
//     };

//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "hidden" && hasChanges) sync();
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [sync, hasChanges, accepted, rejected, swipesCount]);

//   // --- Record swipe events ---
//   const recordSwipeRight = (id: string) => {
//     setAccepted((prev) => [...prev, id]);
//     setSwipesCount((prev) => prev + 1);
//     resetInactivityTimer();
//   };

//   const recordSwipeLeft = (id: string) => {
//     setRejected((prev) => [...prev, id]);
//     setSwipesCount((prev) => prev + 1);
//     resetInactivityTimer();
//   };

//   return {
//     recordSwipeRight,
//     recordSwipeLeft,
//     sync,
//     isSyncing: isMutating,
//     lastSynced,
//     hasChanges,
//   };
// }




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

const generateKey = () =>
  `sync-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function useDiscoverSync() {
  const [accepted, setAccepted] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [swipesCount, setSwipesCount] = useState(0);
  const [lastSynced, setLastSynced] = useState(0);

  const lastSyncedData = useRef<SyncPayload>({
    accepted: [],
    rejected: [],
    swipesCount: 0,
  });

  const syncPending = useRef(false); // 🚀 Prevent overlapping syncs

  const { trigger, isMutating } = useSWRMutation(
    "/api/discover/sync",
    syncFetcher
  );

  const hasChanges =
    accepted.length > 0 || rejected.length > 0 || swipesCount > 0;

  // --- Compare arrays shallowly ---
  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((x, i) => x === b[i]);

  // --- Store failed syncs offline ---
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

  const hasPendingSyncs = async () => {
    const pending = await keys();
    return pending.length > 0;
  };

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
        break; // stop retrying after one failure
      }
    }
  };

  // --- 🧠 MAIN SYNC FUNCTION ---
  const sync = useCallback(async () => {
    if (syncPending.current) {
      console.log("⚠️ Sync skipped — already in progress");
      return;
    }

    syncPending.current = true; // lock
    try {
      const pendingExists = await hasPendingSyncs();

      const changed =
        !arraysEqual(accepted, lastSyncedData.current.accepted) ||
        !arraysEqual(rejected, lastSyncedData.current.rejected) ||
        swipesCount !== lastSyncedData.current.swipesCount;

      // ⛔ Skip if nothing to do
      if (!changed && !pendingExists) return;

      // process queued syncs first
      if (pendingExists) await processQueuedSyncs();

      // perform sync if there are new changes
      if (changed && hasChanges) {
        const payload: SyncPayload = {
          accepted,
          rejected,
          swipesCount,
          timestamp: Date.now(),
        };

        await trigger(payload);

        // update last snapshot
        lastSyncedData.current = {
          accepted: [...accepted],
          rejected: [...rejected],
          swipesCount,
        };

        // reset local buffers
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
    } finally {
      syncPending.current = false; // unlock
    }
  }, [accepted, rejected, swipesCount, hasChanges, trigger]);

  // --- Debounced inactivity sync ---
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (!hasChanges) return;
    inactivityTimer.current = setTimeout(() => {
      console.log("⌛ Auto sync after inactivity");
      sync();
    }, 15000); // increased debounce to 15s
  }, [sync, hasChanges]);

  useEffect(() => {
    if (hasChanges) resetInactivityTimer();
  }, [accepted, rejected, swipesCount, hasChanges, resetInactivityTimer]);

  // --- Sync when online again ---
  useEffect(() => {
    const handleOnline = () => {
      console.log("🌐 Back online — syncing queued data...");
      sync();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [sync]);

  // --- Sync before closing tab ---
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

  // --- Swipe recorders ---
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

