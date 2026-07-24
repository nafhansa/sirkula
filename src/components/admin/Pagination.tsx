interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, total, pageSize, onPageChange }: PaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between px-1 py-3">
      <p className="text-sm text-[var(--color-neutral-500)]">
        Showing{' '}
        <span className="font-semibold">
          {start}–{end}
        </span>{' '}
        of <span className="font-semibold">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-neutral-100)]"
        >
          ‹
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="w-8 h-8 flex items-center justify-center text-sm text-[var(--color-neutral-400)]"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors font-medium"
              style={
                p === page
                  ? { background: 'var(--color-primary)', color: 'white' }
                  : { color: 'var(--color-neutral-700)' }
              }
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-neutral-100)]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
