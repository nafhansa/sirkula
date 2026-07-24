import { Breadcrumb } from '@/components/admin/Breadcrumb';
import { WasteApprovalsTable } from '@/components/admin/WasteApprovalsTable';

export default function WasteApprovalsPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Waste Approvals' }]} />
      <h1 className="text-xl font-bold text-[var(--color-neutral-900)] mb-1">
        Waste Log Approvals
      </h1>
      <p className="text-sm text-[var(--color-neutral-500)] mb-6">
        Review entri sampah dari siswa. Setelah disetujui, poin otomatis ditambahkan ke akun siswa.
      </p>
      <WasteApprovalsTable />
    </div>
  );
}
