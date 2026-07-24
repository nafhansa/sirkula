'use client';

import { type Student, CATEGORY_CONFIG } from '@/types';
import { Avatar } from '@/components/common/Avatar';
import { useAuth } from '@/hooks/useAuth';

const CONTRIBUTION = [
  { category: 'plastic' as const, entries: 45, points: 2250 },
  { category: 'paper' as const, entries: 18, points: 720 },
  { category: 'residue' as const, entries: 2, points: 20 },
];

const RECENT = [
  { date: 'Jun 26, 14:30', category: 'plastic' as const, points: 50 },
  { date: 'Jun 26, 12:15', category: 'paper' as const, points: 40 },
  { date: 'Jun 25, 08:45', category: 'plastic' as const, points: 70 },
];

function buildStats(student: Student) {
  return [
    { label: 'Points', value: student.points.toLocaleString('id-ID'), icon: '⭐' },
    { label: 'Entries', value: student.totalEntries.toString(), icon: '📊' },
    { label: 'CO₂e kg', value: student.co2eKg.toString(), icon: '🌱' },
    { label: 'Streak', value: `${student.streak}d`, icon: '🔥' },
    { label: 'Rank', value: `#${student.rank}`, icon: '📈' },
    { label: 'Total kg', value: `${student.totalWeightKg}kg`, icon: '💾' },
  ];
}

export function ProfileScreen() {
  const { user, isLoading, logout } = useAuth();

  const baseStudent: Student = {
    id: user?.id ?? '',
    name: user?.name ?? '',
    role: 'student',
    points: user?.points ?? 0,
    rank: 0,
    streak: user?.streak ?? 0,
    totalEntries: user?.totalEntries ?? 0,
    totalWeightKg: 0,
    co2eKg: 0,
    joinedAt: new Date().toISOString(),
    ...(user?.schoolName ? { schoolName: user.schoolName } : {}),
  };

  const student = baseStudent;
  const stats = buildStats(student);

  if (isLoading || !user) {
    return <div className="p-4 text-center text-sm text-[var(--color-neutral-500)]">Memuat...</div>;
  }
  const joinDate = new Date(student.joinedAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="px-4 py-4 flex flex-col gap-4">
      {/* Profile card */}
      <div
        className="bg-white rounded-[var(--border-radius-xl)] p-6 flex flex-col items-center text-center"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="mb-3">
          <Avatar name={student.name} src={student.avatarUrl} size="lg" />
        </div>
        <h1 className="text-xl font-bold text-[var(--color-neutral-900)] m-0">{student.name}</h1>
        <p className="text-sm text-[var(--color-neutral-500)] m-0 mt-1">{student.schoolName}</p>
        <p className="text-xs text-[var(--color-neutral-500)] m-0 mt-0.5">Bergabung {joinDate}</p>
      </div>

      {/* Stats grid */}
      <div
        className="bg-white rounded-[var(--border-radius-xl)] p-4"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)] mb-3">
          Key Stats
        </p>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-2 bg-[var(--color-neutral-100)] rounded-[var(--border-radius-md)]"
            >
              <span className="text-xl" aria-hidden="true">
                {stat.icon}
              </span>
              <span className="text-base font-bold text-[var(--color-neutral-900)] mt-1">
                {stat.value}
              </span>
              <span className="text-[10px] text-[var(--color-neutral-500)] uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution */}
      <div
        className="bg-white rounded-[var(--border-radius-xl)] p-4"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)] mb-3">
          Kontribusi (30 Hari)
        </p>
        <div className="flex flex-col gap-3">
          {CONTRIBUTION.map(({ category, entries, points }) => {
            const config = CATEGORY_CONFIG[category];
            return (
              <div key={category} className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">
                  {config.emoji}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-[var(--color-neutral-700)]">
                      {config.label}
                    </span>
                    <span className="text-[var(--color-primary)] font-bold">
                      {points.toLocaleString('id-ID')} pts
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-neutral-500)] m-0">{entries} entri</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div
        className="bg-white rounded-[var(--border-radius-xl)] p-4"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)] mb-3">
          Aktivitas Terbaru
        </p>
        <div className="flex flex-col gap-3">
          {RECENT.map((item, i) => {
            const config = CATEGORY_CONFIG[item.category];
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">
                  {config.emoji}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--color-neutral-900)] m-0">
                    {config.label}
                  </p>
                  <p className="text-xs text-[var(--color-neutral-500)] m-0">{item.date}</p>
                </div>
                <span className="text-sm font-bold text-[var(--color-primary)]">
                  +{item.points} pts
                </span>
              </div>
            );
          })}
        </div>
        <button className="mt-3 w-full py-2 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] rounded-[var(--border-radius-md)] transition-colors">
          Lihat semua {student.totalEntries} entri →
        </button>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        <button className="py-3 px-4 rounded-[var(--border-radius-lg)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-semibold hover:bg-[var(--color-primary-lighter)] transition-colors min-h-[48px]">
          ✏️ Edit Profil
        </button>
        <button
          onClick={() => void logout()}
          className="py-3 px-4 rounded-[var(--border-radius-lg)] border-2 border-[var(--color-danger)] text-[var(--color-danger)] text-sm font-semibold hover:bg-red-50 transition-colors min-h-[48px]"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
