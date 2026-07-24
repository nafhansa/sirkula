import { SystemStatusGrid } from '@/components/admin/SystemStatusGrid';
import { KeyMetricsGrid } from '@/components/admin/KeyMetricsGrid';
import { DailyActivityChart } from '@/components/admin/DailyActivityChart';
import { RevenueBreakdown } from '@/components/admin/RevenueBreakdown';
import { RecentAuditTable } from '@/components/admin/RecentAuditTable';
import {
  type SystemStatus,
  type KeyMetric,
  type ActivityDataPoint,
  type AuditEntry,
} from '@/types/admin';

const SYSTEM_STATUS: SystemStatus[] = [
  {
    id: 'api',
    service: 'API Server',
    status: 'healthy',
    primaryMetric: '145ms avg',
    detail: 'Uptime 99.97% · 30 hari',
  },
  {
    id: 'db',
    service: 'Database',
    status: 'healthy',
    primaryMetric: '4.2 GB / 16 GB',
    detail: 'CPU 12% · Connected',
  },
  {
    id: 'cache',
    service: 'Cache',
    status: 'healthy',
    primaryMetric: 'Hit 92%',
    detail: '1.2 GB digunakan · Online',
  },
  {
    id: 'uptime',
    service: 'DB Uptime',
    status: 'healthy',
    primaryMetric: '99.97%',
    detail: 'Rata-rata 30 hari',
  },
];

const KEY_METRICS: KeyMetric[] = [
  { label: 'Total Sekolah', value: 24, icon: '🏫', trend: 4 },
  { label: 'Total Siswa', value: 12840, icon: '👥', trend: 8 },
  { label: 'Aktif (30 hari)', value: 8423, icon: '✅', trend: 12 },
  { label: 'Entri Bulan Ini', value: 31280, icon: '📦', trend: -3 },
  { label: 'Rata-rata Poin', value: 2450, icon: '⭐', trend: 5 },
];

function generateDailyData(): ActivityDataPoint[] {
  // Deterministic mock — seeded by day-of-month to avoid hydration mismatch
  const base = [
    88, 102, 95, 143, 127, 98, 76, 112, 134, 165, 121, 88, 99, 145, 178, 156, 132, 111, 98, 87, 124,
    143, 167, 189, 176, 154, 132, 118, 98, 112,
  ];
  const now = new Date();
  return base.map((entries, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      entries,
    };
  });
}

const AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: '1',
    timestamp: '28 Jun 09:12',
    user: 'admin@sirkula.id',
    action: 'Onboarded school SMAN 22 Bandung',
    status: 'success',
  },
  {
    id: '2',
    timestamp: '28 Jun 08:45',
    user: 'admin@sirkula.id',
    action: 'Updated reward stock for SMAN 15',
    status: 'success',
  },
  {
    id: '3',
    timestamp: '27 Jun 16:30',
    user: 'staff@sman15.sch.id',
    action: 'Fulfilled redemption REW-0042',
    status: 'success',
  },
  {
    id: '4',
    timestamp: '27 Jun 15:11',
    user: 'admin@sirkula.id',
    action: 'API key rotated for UnileverID',
    status: 'warning',
  },
  {
    id: '5',
    timestamp: '27 Jun 14:02',
    user: 'system',
    action: 'Weekly report generated for NestleID',
    status: 'success',
  },
  {
    id: '6',
    timestamp: '27 Jun 11:50',
    user: 'admin@sirkula.id',
    action: 'Payout disbursed to SMAN 5 Surabaya',
    status: 'success',
  },
  {
    id: '7',
    timestamp: '26 Jun 17:20',
    user: 'api@nestleid',
    action: 'API rate limit exceeded (92%)',
    status: 'error',
  },
  {
    id: '8',
    timestamp: '26 Jun 10:05',
    user: 'admin@sirkula.id',
    action: 'School SMPN 3 Bandung paused',
    status: 'warning',
  },
  {
    id: '9',
    timestamp: '26 Jun 09:00',
    user: 'system',
    action: 'Daily backup completed',
    status: 'success',
  },
  {
    id: '10',
    timestamp: '25 Jun 16:45',
    user: 'admin@sirkula.id',
    action: 'FMCG contract renewed: UnileverID',
    status: 'success',
  },
];

export default function AdminDashboardPage() {
  const dailyData = generateDailyData();

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">System Overview</h1>
        <p className="text-sm text-[var(--color-neutral-500)] mt-1">
          Dashboard administrator Sirkula
        </p>
      </div>

      {/* System status */}
      <section aria-label="System status">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)] mb-3">
          Status Sistem
        </h2>
        <SystemStatusGrid items={SYSTEM_STATUS} />
      </section>

      {/* Key metrics */}
      <section aria-label="Key metrics">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)] mb-3">
          Metrik Utama
        </h2>
        <KeyMetricsGrid metrics={KEY_METRICS} />
      </section>

      {/* Daily chart */}
      <section aria-label="Daily activity chart">
        <DailyActivityChart data={dailyData} />
      </section>

      {/* Revenue breakdown */}
      <section aria-label="Revenue breakdown">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)] mb-3">
          Pendapatan & Material
        </h2>
        <RevenueBreakdown />
      </section>

      {/* Audit table */}
      <section aria-label="Recent audit log">
        <RecentAuditTable entries={AUDIT_ENTRIES} />
      </section>
    </div>
  );
}
