import { Breadcrumb } from '@/components/admin/Breadcrumb';

export default function StaffSettingsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard', href: '/staff' }, { label: 'Settings' }]} />
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-4xl mb-3">🚧</p>
        <p className="font-semibold text-[var(--color-neutral-700)]">Pengaturan Staff</p>
        <p className="text-sm text-[var(--color-neutral-400)] mt-1">
          Akan diimplementasikan di sprint berikutnya
        </p>
      </div>
    </>
  );
}
