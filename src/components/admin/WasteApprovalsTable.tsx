'use client';

import { useCallback, useEffect, useState } from 'react';
import { CATEGORY_CONFIG, PHOTO_BONUS_POINTS, type WasteCategory } from '@/types';
import { Toast } from '@/components/common/Toast';

interface WasteEntryRow {
  id: string;
  productName: string;
  category: WasteCategory;
  photoUrl: string | null;
  notes: string | null;
  status: 'pending' | 'approved' | 'rejected';
  pointsAwarded: number;
  createdAt: string;
  student: { id: string; name: string; email: string };
  ecoStation: { id: string; name: string } | null;
}

type StatusFilter = 'pending' | 'approved' | 'rejected';

const TABS: { id: StatusFilter; label: string }[] = [
  { id: 'pending', label: 'Menunggu' },
  { id: 'approved', label: 'Disetujui' },
  { id: 'rejected', label: 'Ditolak' },
];

export function WasteApprovalsTable() {
  const [filter, setFilter] = useState<StatusFilter>('pending');
  const [entries, setEntries] = useState<WasteEntryRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const load = useCallback(async (status: StatusFilter) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/waste-entries?status=${status}`);
      const data = await res.json();
      setEntries(data.entries ?? []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Refetch whenever the status tab changes; no external store to subscribe to here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(filter);
  }, [filter, load]);

  const potentialPoints = (entry: WasteEntryRow) =>
    CATEGORY_CONFIG[entry.category].basePoints + (entry.photoUrl ? PHOTO_BONUS_POINTS : 0);

  const handleApprove = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/waste-entries/${id}/approve`, { method: 'POST' });
      if (!res.ok) throw new Error();
      setEntries((prev) => prev.filter((e) => e.id !== id));
      setToast({ visible: true, message: '✅ Disetujui — poin ditambahkan ke siswa' });
    } catch {
      setToast({ visible: true, message: '⚠️ Gagal menyetujui entri' });
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/waste-entries/${id}/reject`, { method: 'POST' });
      if (!res.ok) throw new Error();
      setEntries((prev) => prev.filter((e) => e.id !== id));
      setToast({ visible: true, message: '✕ Entri ditolak' });
    } catch {
      setToast({ visible: true, message: '⚠️ Gagal menolak entri' });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl" style={{ boxShadow: 'var(--shadow-admin-sm)' }}>
      <Toast
        message={toast.message}
        type="success"
        visible={toast.visible}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <div className="flex gap-1 px-4 pt-4 border-b border-[var(--color-neutral-200)]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={[
              'px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors',
              filter === tab.id
                ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                : 'text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-800)]',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-[var(--color-neutral-500)] border-b border-[var(--color-neutral-200)]">
              <th className="px-4 py-3 font-semibold">Siswa</th>
              <th className="px-4 py-3 font-semibold">Produk</th>
              <th className="px-4 py-3 font-semibold">Jenis</th>
              <th className="px-4 py-3 font-semibold">Eco-Station</th>
              <th className="px-4 py-3 font-semibold">Foto</th>
              <th className="px-4 py-3 font-semibold">Poin</th>
              <th className="px-4 py-3 font-semibold">Waktu</th>
              {filter === 'pending' && <th className="px-4 py-3 font-semibold">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-[var(--color-neutral-500)]">
                  Memuat...
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-[var(--color-neutral-500)]">
                  Tidak ada entri
                </td>
              </tr>
            ) : (
              entries.map((entry) => {
                const config = CATEGORY_CONFIG[entry.category];
                return (
                  <tr
                    key={entry.id}
                    className="border-b border-[var(--color-neutral-100)] hover:bg-[var(--color-neutral-50)]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[var(--color-neutral-800)] m-0">
                        {entry.student.name}
                      </p>
                      <p className="text-xs text-[var(--color-neutral-500)] m-0">
                        {entry.student.email}
                      </p>
                    </td>
                    <td className="px-4 py-3">{entry.productName}</td>
                    <td className="px-4 py-3">
                      <span aria-hidden="true">{config.emoji}</span> {config.label}
                    </td>
                    <td className="px-4 py-3">{entry.ecoStation?.name ?? '-'}</td>
                    <td className="px-4 py-3">
                      {entry.photoUrl ? (
                        <a
                          href={entry.photoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--color-primary)] underline"
                        >
                          Lihat
                        </a>
                      ) : (
                        <span className="text-[var(--color-neutral-400)]">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {entry.status === 'pending'
                        ? `~${potentialPoints(entry)}`
                        : entry.pointsAwarded}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-neutral-500)]">
                      {new Date(entry.createdAt).toLocaleString('id-ID')}
                    </td>
                    {filter === 'pending' && (
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            disabled={busyId === entry.id}
                            onClick={() => handleApprove(entry.id)}
                            className="px-3 py-1.5 rounded-lg bg-[var(--color-success)] text-white text-xs font-semibold disabled:opacity-50"
                          >
                            ✓ Approve
                          </button>
                          <button
                            disabled={busyId === entry.id}
                            onClick={() => handleReject(entry.id)}
                            className="px-3 py-1.5 rounded-lg bg-[var(--color-danger)] text-white text-xs font-semibold disabled:opacity-50"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
