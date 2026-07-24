'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPendingCount } from '@/lib/db';

export interface OfflineState {
  isOnline: boolean;
  pendingCount: number;
  refreshPendingCount: () => Promise<void>;
}

export function useOffline(): OfflineState {
  // Lazy initializer reads navigator.onLine before first render — avoids setState in effect
  const [isOnline, setIsOnline] = useState(() =>
    typeof window !== 'undefined' ? window.navigator.onLine : true,
  );
  const [pendingCount, setPendingCount] = useState(0);

  const refreshPendingCount = useCallback(async () => {
    try {
      const count = await getPendingCount();
      setPendingCount(count);
    } catch {
      // IDB unavailable (SSR guard or private browsing)
    }
  }, []);

  useEffect(() => {
    // Fetch-on-mount to hydrate the pending queue count from IndexedDB.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshPendingCount();

    const handleOnline = () => {
      setIsOnline(true);
      void refreshPendingCount();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refreshPendingCount]);

  return { isOnline, pendingCount, refreshPendingCount };
}
