'use client';

import { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

const typeConfig: Record<ToastType, { icon: string; bg: string; text: string }> = {
  success: { icon: '✅', bg: 'bg-[var(--color-success)]', text: 'text-white' },
  error: { icon: '❌', bg: 'bg-[var(--color-danger)]', text: 'text-white' },
  warning: { icon: '⚠️', bg: 'bg-[var(--color-warning)]', text: 'text-white' },
  info: { icon: 'ℹ️', bg: 'bg-[var(--color-info)]', text: 'text-white' },
};

export function Toast({
  message,
  type = 'success',
  visible,
  onDismiss,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [visible, onDismiss, duration]);

  if (!visible) return null;

  const config = typeConfig[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'fixed top-4 left-1/2 -translate-x-1/2 z-[60]',
        'flex items-center gap-2 px-4 py-3',
        'rounded-[var(--border-radius-full)] shadow-[var(--shadow-lg)]',
        'text-sm font-semibold whitespace-nowrap',
        'animate-[slideInFromTop_200ms_ease]',
        config.bg,
        config.text,
      ].join(' ')}
    >
      <span aria-hidden="true">{config.icon}</span>
      {message}
    </div>
  );
}
