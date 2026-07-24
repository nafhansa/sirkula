'use client';

import { type ReactNode, useState } from 'react';
import { Pagination } from './Pagination';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  pageSize?: number;
  emptyLabel?: string;
  ariaLabel: string;
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  pageSize = 10,
  emptyLabel = 'Tidak ada data',
  ariaLabel,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const [page, setPage] = useState(1);

  const sorted = sort
    ? [...data].sort((a, b) => {
        const col = columns.find((c) => c.key === sort.key);
        if (!col?.sortValue) return 0;
        const va = col.sortValue(a);
        const vb = col.sortValue(b);
        const cmp =
          typeof va === 'string' ? va.localeCompare(vb as string) : (va as number) - (vb as number);
        return sort.dir === 'asc' ? cmp : -cmp;
      })
    : data;

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable) return;
    setSort((prev) =>
      prev?.key === col.key
        ? { key: col.key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key: col.key, dir: 'asc' },
    );
    setPage(1);
  };

  const alignClass = (align?: 'left' | 'right' | 'center') =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label={ariaLabel}>
          <thead
            style={{
              background: 'var(--color-neutral-50)',
              borderBottom: '1px solid var(--color-neutral-200)',
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`py-3 px-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)] ${alignClass(col.align)} ${col.sortable ? 'cursor-pointer select-none' : ''}`}
                  onClick={() => handleSort(col)}
                >
                  {col.header}
                  {col.sortable && (
                    <span className="ml-1 opacity-50">
                      {sort?.key === col.key ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-sm text-[var(--color-neutral-400)]"
                >
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              paged.map((row) => (
                <tr
                  key={getRowId(row)}
                  style={{ borderBottom: '1px solid var(--color-neutral-100)' }}
                  className="hover:bg-[var(--color-neutral-50)] transition-colors duration-100"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`py-3 px-4 ${alignClass(col.align)}`}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 border-t border-[var(--color-neutral-200)]">
        <Pagination
          page={page}
          totalPages={totalPages}
          total={sorted.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
