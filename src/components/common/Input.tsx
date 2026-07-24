'use client';

import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, className = '', id, ...props },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-[var(--color-neutral-700)]">
          {label}
          {props.required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={[
          'w-full min-h-[48px] px-4 py-3 rounded-[var(--border-radius-md)]',
          'text-base text-[var(--color-neutral-900)]',
          'border transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]',
          'disabled:bg-[var(--color-neutral-200)] disabled:cursor-not-allowed',
          'placeholder:text-[var(--color-neutral-500)]',
          error
            ? 'border-[var(--color-danger)] bg-red-50 animate-[shake_200ms_ease-in-out_2]'
            : 'border-[var(--color-neutral-300)] bg-white',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-[var(--color-neutral-500)]">{helperText}</p>
      )}
    </div>
  );
});

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, error, helperText, showCount, maxLength, className = '', id, value, ...props },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-[var(--color-neutral-700)]">
          {label}
          {props.required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        value={value}
        maxLength={maxLength}
        className={[
          'w-full px-4 py-3 rounded-[var(--border-radius-md)]',
          'text-base text-[var(--color-neutral-900)]',
          'border transition-all duration-150 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]',
          'placeholder:text-[var(--color-neutral-500)]',
          error
            ? 'border-[var(--color-danger)] bg-red-50 animate-[shake_200ms_ease-in-out_2]'
            : 'border-[var(--color-neutral-300)] bg-white',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      <div className="flex justify-between">
        {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-[var(--color-neutral-500)]">{helperText}</p>
        )}
        {showCount && maxLength && (
          <p className="text-xs text-[var(--color-neutral-500)] ml-auto">
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});
