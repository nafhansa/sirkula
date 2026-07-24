import { type KeyMetric } from '@/types/admin';

export function MetricCard({ metric }: { metric: KeyMetric }) {
  const hasTrend = metric.trend !== undefined;
  const isUp = (metric.trend ?? 0) >= 0;

  return (
    <div
      className="bg-white rounded-xl px-5 py-4 flex items-center gap-4"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <span className="text-2xl shrink-0" aria-hidden="true">
        {metric.icon}
      </span>
      <div className="min-w-0">
        <p className="text-xl font-bold text-[var(--color-neutral-900)] leading-tight">
          {typeof metric.value === 'number' ? metric.value.toLocaleString('id-ID') : metric.value}
        </p>
        <p className="text-xs text-[var(--color-neutral-500)] mt-0.5 truncate">{metric.label}</p>
        {hasTrend && (
          <p
            className="text-xs font-semibold mt-1"
            style={{ color: isUp ? 'var(--color-success)' : 'var(--color-danger)' }}
          >
            {isUp ? '↑' : '↓'} {Math.abs(metric.trend!)}% vs bulan lalu
          </p>
        )}
      </div>
    </div>
  );
}
