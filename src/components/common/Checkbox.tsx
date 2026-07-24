'use client';

import { type InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className = '', id, ...props },
  ref,
) {
  const inputId = id ?? label.toLowerCase().replace(/\s/g, '-');

  return (
    <label
      htmlFor={inputId}
      className="flex items-center gap-2 min-h-[44px] text-sm text-[var(--color-neutral-700)] select-none cursor-pointer"
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={[
          'w-[18px] h-[18px] rounded accent-[var(--color-primary)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {label}
    </label>
  );
});
