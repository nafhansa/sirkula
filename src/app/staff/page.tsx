import Link from 'next/link';
import { Breadcrumb } from '@/components/admin/Breadcrumb';

const KPIS = [
  { label: 'Pending Redemptions', value: 7, icon: '📋', href: '/staff/redemptions' },
  { label: 'Total Students', value: '1,200', icon: '👥', href: '/staff/students' },
  { label: 'Active Rewards', value: 12, icon: '🎁', href: '/staff/rewards' },
  { label: 'Waste This Month (kg)', value: '42.3', icon: '♻️', href: '/staff/reports' },
];

export default function StaffDashboardPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">
          School Staff Dashboard
        </h1>
        <p className="text-sm text-[var(--color-neutral-500)] mt-1">SMAN 15 Bandung</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPIS.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-white rounded-xl p-4 transition-transform hover:-translate-y-0.5"
            style={{
              boxShadow: 'var(--shadow-admin-sm)',
              border: '1px solid var(--color-neutral-200)',
            }}
          >
            <span className="text-2xl" aria-hidden="true">
              {kpi.icon}
            </span>
            <p className="text-2xl font-bold text-[var(--color-neutral-900)] mt-2">{kpi.value}</p>
            <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">{kpi.label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
