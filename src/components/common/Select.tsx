'use client';

import { type SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, helperText, options, className = '', id, ...props },
  ref,
) {
  const selectId = id ?? label?.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-[var(--color-neutral-700)]">
          {label}
          {props.required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={[
          'w-full min-h-[48px] px-4 py-3 rounded-[var(--border-radius-md)]',
          'text-base text-[var(--color-neutral-900)] bg-white',
          'border transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]',
          'disabled:bg-[var(--color-neutral-200)] disabled:cursor-not-allowed',
          error ? 'border-[var(--color-danger)] bg-red-50' : 'border-[var(--color-neutral-300)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-[var(--color-neutral-500)]">{helperText}</p>
      )}
    </div>
  );
});
