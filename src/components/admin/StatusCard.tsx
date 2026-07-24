import { type SystemStatus, type SystemStatusLevel } from '@/types/admin';

const STATUS_CONFIG: Record<SystemStatusLevel, { dot: string; label: string; bg: string }> = {
  healthy: { dot: '#4CAF50', label: 'Healthy', bg: '#E8F5E9' },
  warning: { dot: '#FF9800', label: 'Warning', bg: '#FFF8E1' },
  error: { dot: '#F44336', label: 'Error', bg: '#FFEBEE' },
};

export function StatusCard({ item }: { item: SystemStatus }) {
  const cfg = STATUS_CONFIG[item.status];
  return (
    <div
      className="bg-white rounded-xl p-5 flex flex-col gap-3"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)]">
          {item.service}
        </span>
        <span
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: cfg.bg, color: cfg.dot }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: cfg.dot }}
            aria-hidden="true"
          />
          {cfg.label}
        </span>
      </div>
      <p className="text-2xl font-bold text-[var(--color-neutral-900)]">{item.primaryMetric}</p>
      <p className="text-xs text-[var(--color-neutral-500)]">{item.detail}</p>
    </div>
  );
}
