'use client';

import { type LeaderboardEntry } from '@/types';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const MONTHS = ['Juni 2026', 'Mei 2026', 'April 2026'];

const JUNE_2026: LeaderboardEntry[] = [
  {
    rank: 1,
    studentId: '2',
    studentName: 'Budi Santoso',
    points: 3420,
    streak: 18,
    isCurrentUser: false,
  },
  {
    rank: 2,
    studentId: '3',
    studentName: 'Siti Nurhaliza',
    points: 3150,
    streak: 14,
    isCurrentUser: false,
  },
  {
    rank: 3,
    studentId: '4',
    studentName: 'Andi Wijaya',
    points: 2890,
    streak: 10,
    isCurrentUser: false,
  },
  {
    rank: 4,
    studentId: '5',
    studentName: 'Dewi Sartika',
    points: 2750,
    streak: 8,
    isCurrentUser: false,
  },
  {
    rank: 5,
    studentId: '6',
    studentName: 'Rudi Hartono',
    points: 2680,
    streak: 7,
    isCurrentUser: false,
  },
  {
    rank: 6,
    studentId: '7',
    studentName: 'Ani Kusuma',
    points: 2600,
    streak: 6,
    isCurrentUser: false,
  },
  {
    rank: 7,
    studentId: '8',
    studentName: 'Budi Wijaya',
    points: 2520,
    streak: 5,
    isCurrentUser: false,
  },
  {
    rank: 8,
    studentId: '1',
    studentName: 'Jeremy Christiano',
    points: 2450,
    streak: 12,
    isCurrentUser: true,
  },
  {
    rank: 9,
    studentId: '9',
    studentName: 'Sinta Prabowo',
    points: 2340,
    streak: 4,
    isCurrentUser: false,
  },
  {
    rank: 10,
    studentId: '10',
    studentName: 'Hendra Gunawan',
    points: 2210,
    streak: 3,
    isCurrentUser: false,
  },
];

const MONTHLY_LEADERBOARD: LeaderboardEntry[][] = [
  JUNE_2026,
  JUNE_2026.map((e) => ({ ...e, points: Math.round(e.points * 0.92) })),
  JUNE_2026.map((e) => ({ ...e, points: Math.round(e.points * 0.85) })),
];

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export function LeaderboardScreen() {
  const { entries, month, setMonth } = useLeaderboard(MONTHLY_LEADERBOARD);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="px-4 py-4 flex flex-col gap-4">
      {/* Month selector */}
      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Pilih bulan">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setMonth(i)}
            aria-pressed={month === i}
            className={[
              'shrink-0 px-4 py-2 rounded-[var(--border-radius-full)] text-sm font-semibold border-2 transition-all',
              month === i
                ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                : 'bg-white border-[var(--color-neutral-300)] text-[var(--color-neutral-700)]',
            ].join(' ')}
          >
            📅 {m}
          </button>
        ))}
      </div>

      {/* Top 3 */}
      <div
        className="bg-white rounded-[var(--border-radius-xl)] p-4"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)] mb-3">
          Top Siswa
        </p>
        <div className="flex flex-col gap-3">
          {top3.map((entry, i) => (
            <div
              key={entry.studentId}
              className="flex items-center gap-3 animate-[fadeIn_300ms_ease]"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' }}
            >
              <span className="text-2xl w-8 text-center" aria-label={`Peringkat ${entry.rank}`}>
                {MEDAL[entry.rank]}
              </span>
              <div className="flex-1">
                <p className="text-base font-bold text-[var(--color-neutral-900)] m-0">
                  {entry.studentName}
                </p>
                <p className="text-xs text-[var(--color-neutral-500)] m-0">
                  🔥 {entry.streak}-day streak
                </p>
              </div>
              <span className="text-base font-bold text-[var(--color-primary)]">
                {entry.points.toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of list */}
      <div className="flex flex-col gap-2">
        {rest.map((entry, i) => (
          <div
            key={entry.studentId}
            className={[
              'flex items-center gap-3 px-4 py-3 rounded-[var(--border-radius-lg)]',
              'animate-[fadeIn_300ms_ease]',
              entry.isCurrentUser
                ? 'bg-[var(--color-primary-lighter)] border-2 border-[var(--color-primary-light)]'
                : 'bg-white',
            ].join(' ')}
            style={{
              boxShadow: 'var(--shadow-sm)',
              animationDelay: `${(i + 3) * 40}ms`,
              animationFillMode: 'backwards',
            }}
            aria-current={entry.isCurrentUser ? 'true' : undefined}
          >
            <span
              className="w-7 text-center text-sm font-bold"
              style={{
                color: entry.isCurrentUser ? 'var(--color-primary)' : 'var(--color-neutral-500)',
              }}
            >
              #{entry.rank}
            </span>
            <span className="text-lg" aria-hidden="true">
              👤
            </span>
            <p
              className={`flex-1 text-sm font-semibold m-0 ${entry.isCurrentUser ? 'text-[var(--color-primary-dark)] underline' : 'text-[var(--color-neutral-900)]'}`}
            >
              {entry.studentName} {entry.isCurrentUser && '(Kamu)'}
            </p>
            <span
              className="text-sm font-bold"
              style={{
                color: entry.isCurrentUser ? 'var(--color-primary)' : 'var(--color-neutral-700)',
              }}
            >
              {entry.points.toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-[var(--color-neutral-500)] pb-2">
        ℹ️ Leaderboard direset setiap tanggal 1
      </p>
    </div>
  );
}
