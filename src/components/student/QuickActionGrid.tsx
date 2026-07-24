interface StatCardsProps {
  packageCount: number;
  rank: number;
  todayPoints: number;
}

export function StatCards({ packageCount, rank, todayPoints }: StatCardsProps) {
  const stats = [
    { value: packageCount, label: 'Kemasan', highlight: false },
    { value: rank, label: 'Peringkat', highlight: false },
    { value: `+ ${todayPoints}`, label: 'Poin Hari Ini', highlight: true },
  ] as const;

  return (
    <div className="mx-5 grid grid-cols-3 gap-3" aria-label="Statistik kamu">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center py-4 px-2 rounded-[16px] text-center"
          style={{
            background: stat.highlight ? 'var(--color-primary)' : 'white',
            color: stat.highlight ? 'white' : 'var(--color-neutral-900)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span className="text-xl font-bold leading-tight">{stat.value}</span>
          <span
            className="text-xs mt-1 leading-tight"
            style={{
              color: stat.highlight ? 'rgba(255,255,255,0.85)' : 'var(--color-neutral-500)',
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
