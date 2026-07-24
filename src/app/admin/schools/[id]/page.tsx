import { Breadcrumb } from '@/components/admin/Breadcrumb';
import { SchoolDetailTabs } from '@/components/admin/SchoolDetailTabs';
import { type School } from '@/types/admin';

const MOCK_SCHOOL: School = {
  id: '1',
  name: 'SMAN 15 Bandung',
  city: 'Bandung',
  principalName: 'Budi Santoso',
  phone: '082211223344',
  studentCount: 1200,
  ecoStationCount: 8,
  activeStudents30d: 780,
  revenueSharePercent: 70,
  totalRevenueMillion: 8.4,
  status: 'active',
  joinedAt: '2025-08-01',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SchoolDetailPage({ params }: Props) {
  const { id } = await params;
  const school = { ...MOCK_SCHOOL, id };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Schools', href: '/admin/schools' },
          { label: school.name },
        ]}
      />

      {/* School header */}
      <div
        className="bg-white rounded-xl p-6 mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
        style={{
          boxShadow: 'var(--shadow-admin-sm)',
          border: '1px solid var(--color-neutral-200)',
        }}
      >
        {/* Left: info */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">{school.name}</h1>
          <p className="text-sm text-[var(--color-neutral-500)] mt-1">{school.city}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-neutral-400)]">Kepala Sekolah</span>
              <span className="font-semibold text-[var(--color-neutral-800)]">
                {school.principalName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-neutral-400)]">Kontak</span>
              <span className="font-semibold text-[var(--color-neutral-800)]">{school.phone}</span>
            </div>
          </div>
        </div>

        {/* Right: meta + actions */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="px-3 py-1.5 rounded-lg bg-[#E8F5E9] text-[#2D8659] font-semibold text-xs capitalize">
              ● {school.status}
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] text-xs">
              Bergabung:{' '}
              {new Date(school.joinedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] text-xs">
              Revenue Share: {school.revenueSharePercent}%
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <button
              className="px-4 py-2 text-sm rounded-lg font-medium text-white transition-colors"
              style={{ background: 'var(--color-primary)' }}
            >
              Edit
            </button>
            <button className="px-4 py-2 text-sm rounded-lg font-medium border border-[var(--color-neutral-300)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-50)] transition-colors">
              Pause
            </button>
            <button className="px-4 py-2 text-sm rounded-lg font-medium border border-[var(--color-neutral-300)] text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-50)] transition-colors">
              Archive
            </button>
          </div>
        </div>
      </div>

      <SchoolDetailTabs school={school} />
    </div>
  );
}
