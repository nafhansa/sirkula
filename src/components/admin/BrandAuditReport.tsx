'use client';

import { type BrandAudit, type CompetitorShare } from '@/types/admin';
import { type BrandAuditFilters } from './FilterQueryPanel';

const MOCK_BRAND_AUDITS: BrandAudit[] = [
  {
    brand: 'Aqua',
    parentCompany: 'Danone Indonesia',
    packaging: [
      { type: 'Botol PET 600ml', count: 1240, weightKg: 148.8, sharePercent: 62 },
      { type: 'Botol PET 1.5L', count: 380, weightKg: 91.2, sharePercent: 19 },
      { type: 'Gelas Plastik 240ml', count: 460, weightKg: 41.4, sharePercent: 19 },
    ],
    totalUnits: 2080,
    totalWeightKg: 281.4,
    marketSharePercent: 34,
  },
  {
    brand: 'Le Minerale',
    parentCompany: 'Mayora Group',
    packaging: [
      { type: 'Botol PET 550ml', count: 820, weightKg: 90.2, sharePercent: 70 },
      { type: 'Botol PET 1.5L', count: 210, weightKg: 50.4, sharePercent: 30 },
    ],
    totalUnits: 1030,
    totalWeightKg: 140.6,
    marketSharePercent: 21,
  },
];

const COMPETITOR_SHARES: CompetitorShare[] = [
  { name: 'Aqua (Danone)', sharePercent: 34 },
  { name: 'Le Minerale (Mayora)', sharePercent: 21 },
  { name: 'Club (Tirta Fresindo)', sharePercent: 14 },
  { name: 'Vit (Tirta Investama)', sharePercent: 11 },
  { name: 'Lainnya', sharePercent: 20 },
];

const INSIGHTS = [
  'Botol PET 600ml mendominasi 62% dari total kemasan Aqua yang terdeteksi — pertimbangkan program refill khusus untuk ukuran ini.',
  'Le Minerale menunjukkan tren kenaikan 8% market share dibanding periode sebelumnya.',
  'Rasio penerimaan (acceptance rate) kemasan plastik tetap di atas 90% di seluruh sekolah yang difilter.',
];

const RECOMMENDATION =
  'Perluas kemitraan eco-station di sekolah dengan volume PET tertinggi untuk memaksimalkan tingkat pengumpulan dan mengurangi kebocoran plastik ke lingkungan.';

function BrandPackagingSection({ audit }: { audit: BrandAudit }) {
  return (
    <div
      className="bg-white rounded-xl p-5"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-[var(--color-neutral-900)]">{audit.brand}</h3>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: 'var(--color-primary-lighter)', color: 'var(--color-primary-dark)' }}
        >
          {audit.marketSharePercent}% market share
        </span>
      </div>
      <p className="text-xs text-[var(--color-neutral-500)] mb-4">{audit.parentCompany}</p>

      <table className="w-full text-sm" aria-label={`${audit.brand} packaging breakdown`}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
            {['Packaging Type', 'Count', 'Weight (kg)', 'Share %'].map((h) => (
              <th
                key={h}
                scope="col"
                className="py-2 text-left text-xs font-semibold text-[var(--color-neutral-500)] pr-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {audit.packaging.map((p) => (
            <tr key={p.type} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
              <td className="py-2 pr-4 text-[var(--color-neutral-800)]">{p.type}</td>
              <td className="py-2 pr-4 text-[var(--color-neutral-700)]">
                {p.count.toLocaleString('id-ID')}
              </td>
              <td className="py-2 pr-4 text-[var(--color-neutral-700)]">{p.weightKg.toFixed(1)}</td>
              <td className="py-2 pr-4 font-semibold text-[var(--color-neutral-800)]">
                {p.sharePercent}%
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="py-2 pr-4 font-semibold text-[var(--color-neutral-900)]">Total</td>
            <td className="py-2 pr-4 font-semibold text-[var(--color-neutral-900)]">
              {audit.totalUnits.toLocaleString('id-ID')}
            </td>
            <td className="py-2 pr-4 font-semibold text-[var(--color-neutral-900)]">
              {audit.totalWeightKg.toFixed(1)}
            </td>
            <td className="py-2 pr-4 font-semibold text-[var(--color-neutral-900)]">
              {audit.marketSharePercent}%
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function CompetitorSummarySection() {
  return (
    <div
      className="bg-white rounded-xl p-5"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--color-neutral-800)]">
          Competitor Summary
        </h3>
        <button
          className="text-xs font-medium hover:underline"
          style={{ color: 'var(--color-primary)' }}
        >
          View Detailed Breakdown →
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {COMPETITOR_SHARES.map((c) => (
          <div key={c.name}>
            <div className="flex justify-between text-xs text-[var(--color-neutral-600)] mb-1">
              <span className="font-medium">{c.name}</span>
              <span>{c.sharePercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--color-neutral-100)] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.sharePercent}%`, background: 'var(--color-primary)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsRecommendationsSection() {
  return (
    <div
      className="bg-white rounded-xl p-5"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <h3 className="text-sm font-semibold text-[var(--color-neutral-800)] mb-3">
        Insights & Recommendations
      </h3>
      <ul className="list-disc pl-5 flex flex-col gap-2 text-sm text-[var(--color-neutral-700)]">
        {INSIGHTS.map((insight) => (
          <li key={insight}>{insight}</li>
        ))}
      </ul>
      <div
        className="mt-4 p-3 rounded-lg text-sm"
        style={{ background: 'var(--color-primary-lighter)', color: 'var(--color-primary-dark)' }}
      >
        💡 {RECOMMENDATION}
      </div>
    </div>
  );
}

function ESGMetricsSection() {
  const metrics = [
    { label: 'Total Plastic Packaging Attributed', value: '422.0 kg', icon: '♻️' },
    { label: 'CO₂e Avoided via Sorting', value: '186.4 kg', icon: '🌱' },
    { label: 'Contribution to Circular Economy', value: '17.3%', icon: '🔄' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white rounded-xl p-5"
          style={{
            boxShadow: 'var(--shadow-admin-sm)',
            border: '1px solid var(--color-neutral-200)',
          }}
        >
          <span className="text-2xl" aria-hidden="true">
            {m.icon}
          </span>
          <p className="text-2xl font-bold text-[var(--color-neutral-900)] mt-2">{m.value}</p>
          <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

export function BrandAuditReport({ filters }: { filters: BrandAuditFilters }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Report header */}
      <div
        className="bg-white rounded-xl p-5"
        style={{
          boxShadow: 'var(--shadow-admin-sm)',
          border: '1px solid var(--color-neutral-200)',
        }}
      >
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-neutral-900)]">
              Brand Packaging Audit
            </h1>
            <p className="text-sm text-[var(--color-neutral-500)] mt-1">
              Periode: {filters.month} · {filters.schools.length} sekolah
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: '#E8F5E9', color: '#2D8659' }}
            >
              Data Quality: 97%
            </span>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--color-neutral-300)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] transition-colors">
              Download PDF
            </button>
            <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--color-neutral-300)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] transition-colors">
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {MOCK_BRAND_AUDITS.filter((a) => filters.brands.includes(a.brand)).map((audit) => (
        <BrandPackagingSection key={audit.brand} audit={audit} />
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CompetitorSummarySection />
        <InsightsRecommendationsSection />
      </div>

      <ESGMetricsSection />
    </div>
  );
}
