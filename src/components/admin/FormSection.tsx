import { type ReactNode } from 'react';

interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {(title ?? description) && (
        <div>
          {title && (
            <h3 className="text-sm font-semibold text-[var(--color-neutral-800)]">{title}</h3>
          )}
          {description && (
            <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

interface FormGroupProps {
  columns?: 1 | 2;
  children: ReactNode;
}

export function FormGroup({ columns = 1, children }: FormGroupProps) {
  return (
    <div className={columns === 2 ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-4'}>
      {children}
    </div>
  );
}

interface FormActionsProps {
  children: ReactNode;
  align?: 'left' | 'right' | 'between';
}

export function FormActions({ children, align = 'right' }: FormActionsProps) {
  const justify =
    align === 'left' ? 'justify-start' : align === 'between' ? 'justify-between' : 'justify-end';
  return (
    <div
      className={`flex items-center gap-3 pt-2 ${justify}`}
      style={{ borderTop: '1px solid var(--color-neutral-200)' }}
    >
      {children}
    </div>
  );
}
