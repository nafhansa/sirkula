'use client';

import Link from 'next/link';
import { useState } from 'react';
import { type School } from '@/types/admin';
import { Pagination } from './Pagination';

type SortKey = keyof Pick<
  School,
  'name' | 'studentCount' | 'activeStudents30d' | 'totalRevenueMillion'
>;

function SortIndicator({
  col,
  sort,
}: {
  col: SortKey;
  sort: { key: SortKey; dir: 'asc' | 'desc' };
}) {
  if (sort.key !== col) return <span className="ml-1 opacity-30">↕</span>;
  return <span className="ml-1">{sort.dir === 'asc' ? '↑' : '↓'}</span>;
}

const STATUS_STYLE: Record<School['status'], { bg: string; color: string; label: string }> = {
  active: { bg: '#E8F5E9', color: '#2D8659', label: 'Active' },
  paused: { bg: '#FFF8E1', color: '#F57C00', label: 'Paused' },
  archived: { bg: '#F5F5F5', color: '#757575', label: 'Archived' },
};

const PAGE_SIZE = 10;

interface SchoolsTableProps {
  schools: School[];
  onDelete: (id: string) => void;
}

export function SchoolsTable({ schools, onDelete }: SchoolsTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({
    key: 'name',
    dir: 'asc',
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    const va = a[sort.key];
    const vb = b[sort.key];
    const cmp =
      typeof va === 'string' ? va.localeCompare(vb as string) : (va as number) - (vb as number);
    return sort.dir === 'asc' ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const allSelected = paged.length > 0 && paged.every((s) => selected.has(s.id));

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        paged.forEach((s) => next.delete(s.id));
      } else {
        paged.forEach((s) => next.add(s.id));
      }
      return next;
    });
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSort = (key: SortKey) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' },
    );
    setPage(1);
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      {/* Search */}
      <div className="p-4 border-b border-[var(--color-neutral-200)]">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Cari nama sekolah atau kota..."
          className="w-full max-w-sm px-3 py-2 text-sm rounded-lg border border-[var(--color-neutral-300)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-lighter)]"
          aria-label="Search schools"
        />
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-2.5 text-sm"
          style={{
            background: 'var(--color-primary-lighter)',
            borderBottom: '1px solid var(--color-primary-light)',
          }}
        >
          <span className="font-semibold text-[var(--color-primary-dark)]">
            {selected.size} sekolah dipilih
          </span>
          <button
            className="px-3 py-1 rounded-lg bg-white text-sm font-medium text-[var(--color-danger)] border border-[var(--color-danger)] hover:bg-[#FFEBEE] transition-colors"
            onClick={() => {
              selected.forEach(onDelete);
              setSelected(new Set());
            }}
          >
            Hapus
          </button>
          <button
            className="px-3 py-1 rounded-lg bg-white text-sm font-medium text-[var(--color-neutral-600)] border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-50)] transition-colors"
            onClick={() => setSelected(new Set())}
          >
            Batal
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Schools table">
          <thead
            style={{
              background: 'var(--color-neutral-50)',
              borderBottom: '1px solid var(--color-neutral-200)',
            }}
          >
            <tr>
              <th scope="col" className="w-10 py-3 pl-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all on this page"
                  className="rounded"
                />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] cursor-pointer select-none"
                onClick={() => handleSort('name')}
              >
                Nama Sekolah <SortIndicator col="name" sort={sort} />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)]"
              >
                Principal / Kontak
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] cursor-pointer select-none"
                onClick={() => handleSort('studentCount')}
              >
                Siswa / Eco <SortIndicator col="studentCount" sort={sort} />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] cursor-pointer select-none"
                onClick={() => handleSort('activeStudents30d')}
              >
                Aktif <SortIndicator col="activeStudents30d" sort={sort} />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] cursor-pointer select-none"
                onClick={() => handleSort('totalRevenueMillion')}
              >
                Revenue <SortIndicator col="totalRevenueMillion" sort={sort} />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)]"
              >
                Status
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)]"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-sm text-[var(--color-neutral-400)]"
                >
                  Tidak ada sekolah ditemukan
                </td>
              </tr>
            ) : (
              paged.map((school) => {
                const s = STATUS_STYLE[school.status];
                const isSelected = selected.has(school.id);
                return (
                  <tr
                    key={school.id}
                    className="transition-colors"
                    style={{
                      borderBottom: '1px solid var(--color-neutral-100)',
                      background: isSelected ? 'var(--color-primary-lighter)' : undefined,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        (e.currentTarget as HTMLElement).style.background =
                          'var(--color-neutral-50)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.background = '';
                    }}
                  >
                    <td className="py-3 pl-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(school.id)}
                        aria-label={`Select ${school.name}`}
                        className="rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[var(--color-neutral-800)]">{school.name}</p>
                      <p className="text-xs text-[var(--color-neutral-500)]">{school.city}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-[var(--color-neutral-700)]">{school.principalName}</p>
                      <p className="text-xs text-[var(--color-neutral-500)]">{school.phone}</p>
                    </td>
                    <td className="py-3 px-4 text-right text-[var(--color-neutral-700)]">
                      {school.studentCount.toLocaleString('id-ID')} / {school.ecoStationCount}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-[var(--color-neutral-800)]">
                      {school.activeStudents30d.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-[var(--color-neutral-800)]">
                      Rp {school.totalRevenueMillion.toFixed(1)}jt
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/admin/schools/${school.id}`}
                          className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)]"
                        >
                          View
                        </Link>
                        <button className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]">
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(school.id)}
                          className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors text-[var(--color-danger)] hover:bg-[#FFEBEE]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 border-t border-[var(--color-neutral-200)]">
        <Pagination
          page={page}
          totalPages={totalPages}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
