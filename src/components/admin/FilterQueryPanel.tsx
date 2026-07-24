'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';

const SCHOOLS = [
  'SMAN 15 Bandung',
  'SMPN 3 Jakarta',
  'SMAN 5 Surabaya',
  'SMAN 22 Bandung',
  'SMAN 1 Malang',
];
const MONTHS = ['Juli 2026', 'Juni 2026', 'Mei 2026', 'April 2026'];
const BRANDS = ['Aqua', 'Le Minerale', 'Indomie', 'Chitato', 'Teh Botol Sosro'];

export interface BrandAuditFilters {
  schools: string[];
  month: string;
  brands: string[];
}

interface FilterQueryPanelProps {
  onApply: (filters: BrandAuditFilters) => void;
}

export function FilterQueryPanel({ onApply }: FilterQueryPanelProps) {
  const [schools, setSchools] = useState<string[]>(SCHOOLS);
  const [month, setMonth] = useState(MONTHS[0] ?? '');
  const [brands, setBrands] = useState<string[]>(BRANDS);

  const toggleSchool = (s: string) =>
    setSchools((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  return (
    <div
      className="bg-white rounded-xl p-5 sticky top-20 flex flex-col gap-5"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <h3 className="text-sm font-semibold text-[var(--color-neutral-800)]">Filter Query</h3>

      <div>
        <label
          htmlFor="audit-month"
          className="text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide"
        >
          Bulan
        </label>
        <select
          id="audit-month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full mt-1.5 px-3 py-2 text-sm rounded-lg border border-[var(--color-neutral-300)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-lighter)]"
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide mb-1.5">
          Sekolah
        </p>
        <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
          {SCHOOLS.map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 text-sm text-[var(--color-neutral-700)] select-none"
            >
              <input
                type="checkbox"
                checked={schools.includes(s)}
                onChange={() => toggleSchool(s)}
                className="rounded"
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[var(--color-neutral-500)] uppercase tracking-wide mb-1.5">
          Brand
        </p>
        <div className="flex flex-col gap-1.5">
          {BRANDS.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 text-sm text-[var(--color-neutral-700)] select-none"
            >
              <input
                type="checkbox"
                checked={brands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="rounded"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <Button label="Apply Filters" onClick={() => onApply({ schools, month, brands })} fullWidth />
    </div>
  );
}
