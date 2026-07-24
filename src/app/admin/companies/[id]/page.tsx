import { Breadcrumb } from '@/components/admin/Breadcrumb';
import { type FMCGCompany } from '@/types/admin';

const MOCK_COMPANY: FMCGCompany = {
  id: 'unilever',
  name: 'Unilever Indonesia',
  email: 'api@unileverid.com',
  tier: 'enterprise',
  status: 'active',
  contractStart: '2026-01-01',
  contractEnd: '2026-12-31',
  apiRequestsMonth: 18420,
  reportsGenerated: 24,
  rateLimitPercent: 62,
  plan: 'Enterprise — Unlimited Schools',
  costPerMonth: 15000000,
  billingCycle: 'monthly',
  nextChargeDate: '2026-07-01',
  paymentMethod: 'Bank Transfer BCA (**4521)',
};

const RECENT_REPORTS = [
  {
    title: 'Brand Audit – Bandung (Q2 2026)',
    date: '27 Jun 2026',
    schools: '8 sekolah',
    quality: 98,
  },
  {
    title: 'Brand Audit – Jakarta (Jun 2026)',
    date: '15 Jun 2026',
    schools: '5 sekolah',
    quality: 95,
  },
  {
    title: 'Brand Audit – Surabaya (Mei 2026)',
    date: '31 Mei 2026',
    schools: '4 sekolah',
    quality: 97,
  },
  { title: 'ESG Report (Q1 2026)', date: '01 Apr 2026', schools: 'All schools', quality: 99 },
];

const TIER_STYLE: Record<FMCGCompany['tier'], { bg: string; color: string }> = {
  starter: { bg: '#E3F2FD', color: '#1565C0' },
  professional: { bg: '#FFF8E1', color: '#E65100' },
  enterprise: { bg: '#E8F5E9', color: '#1B5E3F' },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FMCGCompanyPage({ params }: Props) {
  const { id } = await params;
  const company = { ...MOCK_COMPANY, id };
  const tierStyle = TIER_STYLE[company.tier];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'FMCG Companies', href: '/admin/companies' },
          { label: company.name },
        ]}
      />

      {/* Company header */}
      <div
        className="bg-white rounded-xl p-6"
        style={{
          boxShadow: 'var(--shadow-admin-sm)',
          border: '1px solid var(--color-neutral-200)',
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">{company.name}</h1>
            <p className="text-sm text-[var(--color-neutral-500)] mt-1">{company.email}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
                style={{ background: tierStyle.bg, color: tierStyle.color }}
              >
                {company.tier}
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
                style={
                  company.status === 'active'
                    ? { background: '#E8F5E9', color: '#2D8659' }
                    : { background: '#FFEBEE', color: '#C62828' }
                }
              >
                ● {company.status}
              </span>
            </div>
          </div>
          <div className="text-right text-sm text-[var(--color-neutral-500)]">
            <p>
              Kontrak:{' '}
              {new Date(company.contractStart).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <p>
              s/d{' '}
              {new Date(company.contractEnd).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* API usage cards */}
      <section aria-label="API Usage">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-500)] mb-3">
          Penggunaan API — Bulan Ini
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: 'API Requests',
              value: company.apiRequestsMonth.toLocaleString('id-ID'),
              icon: '📡',
            },
            { label: 'Reports Generated', value: company.reportsGenerated, icon: '📄' },
            {
              label: 'Rate Limit Usage',
              value: `${company.rateLimitPercent}%`,
              icon: '⚡',
              warn: company.rateLimitPercent > 80,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl p-5"
              style={{
                boxShadow: 'var(--shadow-admin-sm)',
                border: `1px solid ${'warn' in card && card.warn ? 'var(--color-warning)' : 'var(--color-neutral-200)'}`,
              }}
            >
              <span className="text-2xl" aria-hidden="true">
                {card.icon}
              </span>
              <p className="text-2xl font-bold text-[var(--color-neutral-900)] mt-2">
                {card.value}
              </p>
              <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent reports */}
      <section aria-label="Recent reports">
        <div
          className="bg-white rounded-xl p-5"
          style={{
            boxShadow: 'var(--shadow-admin-sm)',
            border: '1px solid var(--color-neutral-200)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--color-neutral-800)]">
              Laporan Terbaru
            </h3>
            <button
              className="text-xs font-medium hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Load more →
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {RECENT_REPORTS.map((r) => (
              <div
                key={r.title}
                className="flex items-center gap-4 p-3 rounded-xl border border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-50)] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-neutral-800)] truncate">
                    {r.title}
                  </p>
                  <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">
                    {r.date} · {r.schools}
                  </p>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: '#E8F5E9', color: '#2D8659' }}
                >
                  Quality {r.quality}%
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  {['PDF', 'CSV', 'JSON'].map((fmt) => (
                    <button
                      key={fmt}
                      className="px-2.5 py-1 text-xs font-medium rounded-md border border-[var(--color-neutral-300)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] transition-colors"
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription & billing */}
      <section aria-label="Subscription and billing">
        <div
          className="bg-white rounded-xl p-5"
          style={{
            boxShadow: 'var(--shadow-admin-sm)',
            border: '1px solid var(--color-neutral-200)',
          }}
        >
          <h3 className="text-sm font-semibold text-[var(--color-neutral-800)] mb-4">
            Subscription & Billing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-5">
            {[
              ['Plan', company.plan],
              ['Biaya', `Rp ${(company.costPerMonth / 1_000_000).toFixed(0)} juta / bulan`],
              ['Billing Cycle', company.billingCycle],
              [
                'Tagihan Berikutnya',
                new Date(company.nextChargeDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }),
              ],
              ['Metode Pembayaran', company.paymentMethod],
              ['Status', 'Aktif'],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5">
                <span className="text-xs text-[var(--color-neutral-500)]">{k}</span>
                <span className="font-semibold text-[var(--color-neutral-800)]">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-sm rounded-lg font-medium border border-[var(--color-neutral-300)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-50)] transition-colors">
              Ganti Plan
            </button>
            <button className="px-4 py-2 text-sm rounded-lg font-medium border border-[var(--color-neutral-300)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-50)] transition-colors">
              Update Pembayaran
            </button>
            <button className="px-4 py-2 text-sm rounded-lg font-medium border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-[#FFEBEE] transition-colors">
              Batalkan Langganan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
