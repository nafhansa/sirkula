'use client';

import { useState } from 'react';
import { type Student } from '@/types';
import { Pagination } from '@/components/admin/Pagination';
import { Badge } from '@/components/common/Badge';

type SortKey = keyof Pick<Student, 'name' | 'points' | 'totalEntries' | 'streak'>;
type StudentStatus = 'active' | 'inactive';

function getStatus(student: Student): StudentStatus {
  return student.streak > 0 ? 'active' : 'inactive';
}

const PAGE_SIZE = 10;

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

export function StudentsTable({ students }: { students: Student[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({
    key: 'points',
    dir: 'desc',
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    const va = a[sort.key];
    const vb = b[sort.key];
    const cmp =
      typeof va === 'string' ? va.localeCompare(vb as string) : (va as number) - (vb as number);
    return sort.dir === 'asc' ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' },
    );
    setPage(1);
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <div className="p-4 border-b border-[var(--color-neutral-200)]">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Cari nama siswa..."
          className="w-full max-w-sm px-3 py-2 text-sm rounded-lg border border-[var(--color-neutral-300)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-lighter)]"
          aria-label="Search students"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Students table">
          <thead
            style={{
              background: 'var(--color-neutral-50)',
              borderBottom: '1px solid var(--color-neutral-200)',
            }}
          >
            <tr>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] cursor-pointer select-none"
                onClick={() => handleSort('name')}
              >
                Nama <SortIndicator col="name" sort={sort} />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] cursor-pointer select-none"
                onClick={() => handleSort('points')}
              >
                Poin <SortIndicator col="points" sort={sort} />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] cursor-pointer select-none"
                onClick={() => handleSort('totalEntries')}
              >
                Entries <SortIndicator col="totalEntries" sort={sort} />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] cursor-pointer select-none"
                onClick={() => handleSort('streak')}
              >
                🔥 Streak <SortIndicator col="streak" sort={sort} />
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)]"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-sm text-[var(--color-neutral-400)]"
                >
                  Tidak ada siswa ditemukan
                </td>
              </tr>
            ) : (
              paged.map((student) => {
                const status = getStatus(student);
                return (
                  <tr
                    key={student.id}
                    style={{ borderBottom: '1px solid var(--color-neutral-100)' }}
                    className="hover:bg-[var(--color-neutral-50)] transition-colors duration-100"
                  >
                    <td className="py-3 px-4 font-semibold text-[var(--color-neutral-800)]">
                      {student.name}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-[var(--color-neutral-800)]">
                      {student.points.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right text-[var(--color-neutral-700)]">
                      {student.totalEntries}
                    </td>
                    <td className="py-3 px-4 text-right text-[var(--color-neutral-700)]">
                      {student.streak}d
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        label={status === 'active' ? 'Active' : 'Inactive'}
                        variant={status === 'active' ? 'success' : 'neutral'}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

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
