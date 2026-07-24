'use client';

import { useState } from 'react';
import { type ActivityEntry, CATEGORY_CONFIG } from '@/types';

interface ActivityFeedProps {
  entries: ActivityEntry[];
}

const THUMB_COLORS: Record<string, string> = {
  plastic: '#E3F2FD',
  paper: '#FFF8E1',
  residue: '#EFEBE9',
};

function formatRelativeTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  return isToday ? `Hari ini, ${time}` : `Kemarin, ${time}`;
}

function StatusBadge({ status }: { status: 'pending' | 'rejected' }) {
  const style =
    status === 'pending'
      ? { bg: 'var(--color-warning)', label: '⏳ Pending' }
      : { bg: 'var(--color-danger)', label: '✕ Ditolak' };
  return (
    <span
      className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full shrink-0"
      style={{ backgroundColor: style.bg }}
    >
      {style.label}
    </span>
  );
}

export function ActivityFeed({ entries }: ActivityFeedProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? entries : entries.slice(0, 3);

  if (entries.length === 0) return null;

  return (
    <section aria-label="Riwayat Terakhir" className="px-5">
      <p className="text-lg font-bold text-[var(--color-neutral-900)] mb-3">Riwayat Terakhir</p>
      <div className="flex flex-col gap-3">
        {visible.map((entry) => {
          const cat = CATEGORY_CONFIG[entry.category];
          const thumbBg = THUMB_COLORS[entry.category] ?? '#F5F5F5';

          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 bg-white rounded-[16px] p-3"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              {/* Thumbnail */}
              <div
                className="w-16 h-16 rounded-[12px] flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundColor: thumbBg }}
                aria-hidden="true"
              >
                {cat.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[var(--color-neutral-900)] m-0">
                    Sampah {cat.label}
                  </p>
                  {entry.status && entry.status !== 'approved' && (
                    <StatusBadge status={entry.status} />
                  )}
                </div>
                <p className="text-xs text-[var(--color-neutral-500)] m-0 mt-0.5">
                  {entry.status === 'pending'
                    ? `Menunggu approval admin (${formatRelativeTime(entry.createdAt)})`
                    : entry.status === 'rejected'
                      ? `Ditolak (${formatRelativeTime(entry.createdAt)})`
                      : `+${entry.pointsEarned} Poin (${formatRelativeTime(entry.createdAt)})`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {entries.length > 3 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full mt-3 py-3 text-sm font-semibold rounded-[12px] bg-white transition-colors"
          style={{ color: 'var(--color-primary)', boxShadow: 'var(--shadow-sm)' }}
        >
          {expanded ? 'Sembunyikan ↑' : `Lihat semua ${entries.length} riwayat →`}
        </button>
      )}
    </section>
  );
}
