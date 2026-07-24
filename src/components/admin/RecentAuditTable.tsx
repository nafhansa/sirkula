import { type AuditEntry } from '@/types/admin';
import { AuditTable } from './AuditTable';

interface RecentAuditTableProps {
  entries: AuditEntry[];
}

export function RecentAuditTable({ entries }: RecentAuditTableProps) {
  return (
    <AuditTable
      entries={entries}
      title="Recent Audit Log"
      subtitle="10 aktivitas terbaru"
      viewAllHref="/admin/settings/audit"
    />
  );
}
