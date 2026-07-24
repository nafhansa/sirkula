import { type AuditEntry } from '@/types/admin';

const STATUS_STYLE: Record<AuditEntry['status'], { bg: string; color: string }> = {
  success: { bg: '#E8F5E9', color: '#2D8659' },
  warning: { bg: '#FFF8E1', color: '#F57C00' },
  error: { bg: '#FFEBEE', color: '#C62828' },
};

interface AuditTableProps {
  entries: AuditEntry[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function AuditTable({
  entries,
  title = 'Audit Log',
  subtitle,
  viewAllHref,
  viewAllLabel = 'View full log →',
}: AuditTableProps) {
  return (
    <div
      className="bg-white rounded-xl p-5"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-neutral-800)]">{title}</h3>
          {subtitle && <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="text-xs font-semibold hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            {viewAllLabel}
          </a>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label={title}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-neutral-200)' }}>
              {['Waktu', 'User', 'Aksi', 'Status'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => {
              const s = STATUS_STYLE[e.status];
              return (
                <tr
                  key={e.id}
                  className="hover:bg-[var(--color-neutral-50)] transition-colors duration-100"
                  style={{ borderBottom: '1px solid var(--color-neutral-100)' }}
                >
                  <td className="py-2.5 pr-4 text-[var(--color-neutral-500)] whitespace-nowrap text-xs">
                    {e.timestamp}
                  </td>
                  <td className="py-2.5 pr-4 font-medium text-[var(--color-neutral-800)] whitespace-nowrap">
                    {e.user}
                  </td>
                  <td className="py-2.5 pr-4 text-[var(--color-neutral-600)]">{e.action}</td>
                  <td className="py-2.5">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
                      style={{ background: s.bg, color: s.color }}
                    >
                      {e.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
