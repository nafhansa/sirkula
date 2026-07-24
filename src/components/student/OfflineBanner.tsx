'use client';

import { useOffline } from '@/hooks/useOffline';

export function OfflineBanner() {
  const { isOnline, pendingCount } = useOffline();

  if (!isOnline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-4 mb-3 flex items-center gap-2.5 px-4 py-2.5 rounded-[12px] text-white text-sm font-medium"
        style={{ background: 'var(--color-danger)' }}
      >
        <span aria-hidden="true">📵</span>
        <span>Offline — log sampah akan tersimpan & sync otomatis saat online kembali</span>
      </div>
    );
  }

  if (pendingCount > 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-4 mb-3 flex items-center gap-2.5 px-4 py-2.5 rounded-[12px] text-white text-sm font-medium"
        style={{ background: 'var(--color-warning)' }}
      >
        <span aria-hidden="true" className="animate-spin inline-block">
          🔄
        </span>
        <span>{pendingCount} log menunggu sinkronisasi...</span>
      </div>
    );
  }

  return null;
}
