'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PIE_DATA = [
  { name: 'Plastic', value: 60, color: '#2196F3' },
  { name: 'Paper', value: 30, color: '#FF9800' },
  { name: 'Residue', value: 10, color: '#795548' },
];

const FINANCIAL_ROWS = [
  { label: 'Material Revenue', value: 'Rp 48.2 juta', status: 'settled' },
  { label: 'Platform Fee (30%)', value: 'Rp 14.5 juta', status: 'settled' },
  { label: 'School Net (70%)', value: 'Rp 33.7 juta', status: 'pending' },
  { label: 'FMCG Subscription', value: 'Rp 12.0 juta', status: 'settled' },
];

const STATUS_COLORS: Record<string, string> = {
  settled: 'var(--color-success)',
  pending: 'var(--color-warning)',
};

export function RevenueBreakdown() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Pie chart */}
      <div
        className="bg-white rounded-xl p-5 animate-[fadeIn_300ms_ease]"
        style={{
          boxShadow: 'var(--shadow-admin-sm)',
          border: '1px solid var(--color-neutral-200)',
        }}
      >
        <h3 className="text-sm font-semibold text-[var(--color-neutral-800)] mb-1">
          Komposisi Material
        </h3>
        <p className="text-xs text-[var(--color-neutral-500)] mb-4">
          Distribusi jenis sampah bulan ini
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={PIE_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {PIE_DATA.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number) => `${v}%`}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, color: 'var(--color-neutral-600)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Financial summary */}
      <div
        className="bg-white rounded-xl p-5 animate-[fadeIn_300ms_ease]"
        style={{
          boxShadow: 'var(--shadow-admin-sm)',
          border: '1px solid var(--color-neutral-200)',
        }}
      >
        <h3 className="text-sm font-semibold text-[var(--color-neutral-800)] mb-1">
          Ringkasan Finansial
        </h3>
        <p className="text-xs text-[var(--color-neutral-500)] mb-4">Juni 2026</p>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
              <th className="text-left py-2 text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide">
                Item
              </th>
              <th className="text-right py-2 text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide">
                Nilai
              </th>
              <th className="text-right py-2 text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {FINANCIAL_ROWS.map((row) => (
              <tr
                key={row.label}
                className="hover:bg-[var(--color-neutral-50)] transition-colors duration-100"
                style={{ borderBottom: '1px solid var(--color-neutral-100)' }}
              >
                <td className="py-2.5 text-[var(--color-neutral-700)]">{row.label}</td>
                <td className="py-2.5 text-right font-semibold text-[var(--color-neutral-800)]">
                  {row.value}
                </td>
                <td className="py-2.5 text-right">
                  <span
                    className="text-xs font-semibold capitalize"
                    style={{ color: STATUS_COLORS[row.status] }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
