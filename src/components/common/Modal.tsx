'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import { Button } from './Button';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  confirmLoading?: boolean;
  confirmVariant?: 'primary' | 'danger';
}

export function Modal({
  visible,
  title,
  onClose,
  children,
  confirmLabel,
  cancelLabel = 'Batal',
  onConfirm,
  confirmLoading,
  confirmVariant = 'primary',
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerElRef = useRef<Element | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    if (visible) {
      triggerElRef.current = document.activeElement;
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      firstFocusable?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      if (visible && triggerElRef.current instanceof HTMLElement) {
        triggerElRef.current.focus();
      }
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-[fadeIn_200ms_ease]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — full screen bottom sheet on mobile, centered on tablet+ */}
      <div
        ref={panelRef}
        className="relative z-10 w-full sm:max-w-md bg-white rounded-t-[var(--border-radius-xl)] sm:rounded-[var(--border-radius-xl)] shadow-[var(--shadow-lg)] animate-[fadeIn_200ms_ease] sm:animate-[scaleIn_200ms_ease] max-h-[90dvh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[var(--color-neutral-200)]">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-[var(--color-neutral-900)] m-0"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-neutral-200)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4">{children}</div>

        {/* Actions */}
        {(confirmLabel ?? cancelLabel) && (
          <div className="flex gap-3 px-5 pb-5 safe-bottom">
            <Button label={cancelLabel} variant="outline" fullWidth onClick={onClose} />
            {confirmLabel && onConfirm && (
              <Button
                label={confirmLabel}
                variant={confirmVariant}
                fullWidth
                loading={confirmLoading}
                onClick={onConfirm}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
