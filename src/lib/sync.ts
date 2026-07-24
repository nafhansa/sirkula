import { addPendingLog, type PendingLog } from './db';

export async function registerServiceWorker(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') return;
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  } catch {
    // SW registration is best-effort; app still works without it
  }
}

export async function requestBackgroundSync(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    // SyncManager may not be available in all browsers (notably Safari < 16)
    if ('sync' in reg) {
      await (
        reg as ServiceWorkerRegistration & { sync: { register(tag: string): Promise<void> } }
      ).sync.register('sync-waste-logs');
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

export async function queueWasteLog(
  log: Omit<PendingLog, 'id' | 'createdAt' | 'retryCount'>,
): Promise<void> {
  const pending: PendingLog = {
    ...log,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    retryCount: 0,
  };
  await addPendingLog(pending);
  await requestBackgroundSync();
}
