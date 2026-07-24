'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/admin/Breadcrumb';
import { DailyActivityChart } from '@/components/admin/DailyActivityChart';
import { Button } from '@/components/common/Button';
import { Toast } from '@/components/common/Toast';
import { type ActivityDataPoint } from '@/types/admin';

const ACTIVITY_DATA: ActivityDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}/07`,
  entries: 40 + ((i * 37) % 90),
}));

const CATEGORY_SUMMARY = [
  { label: 'Plastik', entries: 412, weightKg: 24.1, points: 20600, color: '#2196F3' },
  { label: 'Kertas', entries: 268, weightKg: 14.8, points: 10720, color: '#FF9800' },
  { label: 'Residu', entries: 95, weightKg: 3.4, points: 950, color: '#795548' },
];

function downloadCsv() {
  const header = 'Kategori,Entries,Berat (kg),Poin\n';
  const rows = CATEGORY_SUMMARY.map(
    (c) => `${c.label},${c.entries},${c.weightKg},${c.points}`,
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sirkula-laporan-aktivitas.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function StaffReportsPage() {
  const [toast, setToast] = useState({ visible: false, message: '' });

  return (
    <>
      <Toast
        message={toast.message}
        type="info"
        visible={toast.visible}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <Breadcrumb items={[{ label: 'Dashboard', href: '/staff' }, { label: 'Reports' }]} />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">
            Laporan Aktivitas Sekolah
          </h1>
          <p className="text-sm text-[var(--color-neutral-500)] mt-1">Juli 2026</p>
        </div>
        <div className="flex gap-2">
          <Button label="Export CSV" variant="outline" size="sm" onClick={downloadCsv} />
          <Button
            label="Export PDF"
            variant="outline"
            size="sm"
            onClick={() =>
              setToast({ visible: true, message: 'ℹ️ Export PDF menunggu integrasi backend' })
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <DailyActivityChart data={ACTIVITY_DATA} />

        <div
          className="bg-white rounded-xl p-5"
          style={{
            boxShadow: 'var(--shadow-admin-sm)',
            border: '1px solid var(--color-neutral-200)',
          }}
        >
          <h3 className="text-sm font-semibold text-[var(--color-neutral-800)] mb-4">
            Breakdown per Kategori
          </h3>
          <table className="w-full text-sm" aria-label="Category breakdown">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                {['Kategori', 'Entries', 'Berat (kg)', 'Poin'].map((h) => (
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
              {CATEGORY_SUMMARY.map((c) => (
                <tr key={c.label} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                  <td className="py-2.5 pr-4 font-medium text-[var(--color-neutral-800)] flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ background: c.color }}
                    />
                    {c.label}
                  </td>
                  <td className="py-2.5 pr-4 text-[var(--color-neutral-700)]">{c.entries}</td>
                  <td className="py-2.5 pr-4 text-[var(--color-neutral-700)]">{c.weightKg} kg</td>
                  <td className="py-2.5 pr-4 font-semibold text-[var(--color-neutral-800)]">
                    {c.points.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
