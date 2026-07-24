'use client';

import { useState } from 'react';
import { type School } from '@/types/admin';

const TABS = ['Overview', 'Students', 'Rewards', 'Finances', 'Logs'] as const;
type Tab = (typeof TABS)[number];

const PERFORMANCE_STATS = [
  { label: 'Total Siswa', value: '1,200', icon: '👥' },
  { label: 'Aktif (30 hari)', value: '780', icon: '✅' },
  { label: 'Sampah (Bulan Ini)', value: '42.3 kg', icon: '♻️' },
  { label: 'Acceptance Rate', value: '94%', icon: '📊' },
];

const TOP_STUDENTS = [
  { rank: 1, name: 'Sekar Ayu', points: 3240, entries: 28, streak: 21 },
  { rank: 2, name: 'Rizky Pratama', points: 2980, entries: 24, streak: 18 },
  { rank: 3, name: 'Dita Fitriana', points: 2760, entries: 22, streak: 15 },
  { rank: 4, name: 'Budi Santoso Jr.', points: 2540, entries: 20, streak: 12 },
  { rank: 5, name: 'Nadia Putri', points: 2320, entries: 19, streak: 10 },
];

const ECO_STATIONS = [
  { id: 'ESB-01', location: 'Kantin Area', totalScans: 1420, lastUsed: '28 Jun, 10:22' },
  { id: 'ESB-02', location: 'Koridor Blok A', totalScans: 980, lastUsed: '28 Jun, 09:45' },
  { id: 'ESB-03', location: 'Depan Lab IPA', totalScans: 756, lastUsed: '27 Jun, 15:30' },
  { id: 'ESB-04', location: 'Area Olahraga', totalScans: 540, lastUsed: '27 Jun, 14:10' },
];

const WASTE_BREAKDOWN = [
  { label: 'Plastik', thisMonth: 24.1, lastMonth: 22.3, color: '#2196F3' },
  { label: 'Kertas', thisMonth: 14.8, lastMonth: 16.1, color: '#FF9800' },
  { label: 'Residu', thisMonth: 3.4, lastMonth: 2.8, color: '#795548' },
];

function OverviewTab(_props: { school: School }) {
  const maxKg = Math.max(...WASTE_BREAKDOWN.map((w) => Math.max(w.thisMonth, w.lastMonth)));

  return (
    <div className="flex flex-col gap-6 pt-5">
      {/* Performance cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {PERFORMANCE_STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-4"
            style={{
              boxShadow: 'var(--shadow-admin-sm)',
              border: '1px solid var(--color-neutral-200)',
            }}
          >
            <span className="text-2xl" aria-hidden="true">
              {s.icon}
            </span>
            <p className="text-2xl font-bold text-[var(--color-neutral-900)] mt-2">{s.value}</p>
            <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Waste breakdown + Top students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Waste breakdown */}
        <div
          className="bg-white rounded-xl p-5"
          style={{
            boxShadow: 'var(--shadow-admin-sm)',
            border: '1px solid var(--color-neutral-200)',
          }}
        >
          <h3 className="text-sm font-semibold text-[var(--color-neutral-800)] mb-4">
            Breakdown Sampah (kg)
          </h3>
          <div className="flex flex-col gap-3">
            {WASTE_BREAKDOWN.map((w) => (
              <div key={w.label}>
                <div className="flex justify-between text-xs text-[var(--color-neutral-500)] mb-1">
                  <span className="font-medium text-[var(--color-neutral-700)]">{w.label}</span>
                  <span>
                    Bulan ini: <strong>{w.thisMonth} kg</strong> · Lalu: {w.lastMonth} kg
                  </span>
                </div>
                <div className="flex gap-1 h-2">
                  <div
                    className="rounded-full"
                    style={{ width: `${(w.thisMonth / maxKg) * 100}%`, background: w.color }}
                  />
                  <div
                    className="rounded-full opacity-30"
                    style={{ width: `${(w.lastMonth / maxKg) * 100}%`, background: w.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top students */}
        <div
          className="bg-white rounded-xl p-5"
          style={{
            boxShadow: 'var(--shadow-admin-sm)',
            border: '1px solid var(--color-neutral-200)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--color-neutral-800)]">Top Siswa</h3>
            <button
              className="text-xs font-medium hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Lihat semua →
            </button>
          </div>
          <table className="w-full text-sm" aria-label="Top students">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                {['#', 'Nama', 'Poin', 'Entri', '🔥'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="py-1.5 text-left text-xs text-[var(--color-neutral-500)] font-semibold pr-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_STUDENTS.map((s) => (
                <tr key={s.rank} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                  <td className="py-2 pr-3 font-bold text-[var(--color-neutral-400)]">{s.rank}</td>
                  <td className="py-2 pr-3 font-medium text-[var(--color-neutral-800)]">
                    {s.name}
                  </td>
                  <td className="py-2 pr-3 text-[var(--color-neutral-700)]">
                    {s.points.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2 pr-3 text-[var(--color-neutral-500)]">{s.entries}</td>
                  <td className="py-2 text-[var(--color-neutral-600)]">{s.streak}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Eco-station status */}
      <div
        className="bg-white rounded-xl p-5"
        style={{
          boxShadow: 'var(--shadow-admin-sm)',
          border: '1px solid var(--color-neutral-200)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--color-neutral-800)]">
            Status Eco-Station
          </h3>
          <button
            className="text-xs font-medium hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            Lihat semua →
          </button>
        </div>
        <table className="w-full text-sm" aria-label="Eco-station status">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
              {['Station ID', 'Lokasi', 'Total Scan', 'Terakhir Digunakan'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="py-1.5 text-left text-xs text-[var(--color-neutral-500)] font-semibold pr-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ECO_STATIONS.map((e) => (
              <tr key={e.id} style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
                <td className="py-2.5 pr-4 font-mono text-xs font-semibold text-[var(--color-primary)]">
                  {e.id}
                </td>
                <td className="py-2.5 pr-4 text-[var(--color-neutral-700)]">{e.location}</td>
                <td className="py-2.5 pr-4 font-semibold text-[var(--color-neutral-800)]">
                  {e.totalScans.toLocaleString('id-ID')}
                </td>
                <td className="py-2.5 text-[var(--color-neutral-500)] text-xs">{e.lastUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlaceholderTab({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-4xl mb-3">🚧</p>
      <p className="font-semibold text-[var(--color-neutral-700)]">Tab {name}</p>
      <p className="text-sm text-[var(--color-neutral-400)] mt-1">
        Akan diimplementasikan di sprint berikutnya
      </p>
    </div>
  );
}

export function SchoolDetailTabs({ school }: { school: School }) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  return (
    <div>
      {/* Sticky tabs */}
      <div
        className="flex border-b sticky top-16 bg-white z-30 -mx-6 px-6"
        style={{ borderColor: 'var(--color-neutral-200)' }}
        role="tablist"
        aria-label="School detail tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-3 text-sm font-medium transition-colors relative"
            style={{
              color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-neutral-500)',
            }}
          >
            {tab}
            {activeTab === tab && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                style={{ background: 'var(--color-primary)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div role="tabpanel" aria-label={`${activeTab} tab content`}>
        {activeTab === 'Overview' && <OverviewTab school={school} />}
        {activeTab !== 'Overview' && <PlaceholderTab name={activeTab} />}
      </div>
    </div>
  );
}
