type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
}

const VARIANT_STYLE: Record<BadgeVariant, { bg: string; color: string }> = {
  neutral: { bg: '#F5F5F5', color: '#757575' },
  success: { bg: '#E8F5E9', color: '#2D8659' },
  warning: { bg: '#FFF8E1', color: '#F57C00' },
  danger: { bg: '#FFEBEE', color: '#C62828' },
  info: { bg: '#E3F2FD', color: '#1565C0' },
  primary: { bg: 'var(--color-primary-lighter)', color: 'var(--color-primary-dark)' },
};

export function Badge({ label, variant = 'neutral', dot = false }: BadgeProps) {
  const style = VARIANT_STYLE[variant];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: style.bg, color: style.color }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: style.color }}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}
