import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  padding?: boolean;
}

const shadowMap = {
  sm: 'shadow-[var(--shadow-sm)]',
  md: 'shadow-[var(--shadow-md)]',
  lg: 'shadow-[var(--shadow-lg)]',
};

export function Card({
  children,
  className = '',
  shadow = 'sm',
  onClick,
  padding = true,
}: CardProps) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick}
      className={[
        'bg-white rounded-[var(--border-radius-lg)]',
        shadowMap[shadow],
        padding ? 'p-4' : '',
        onClick
          ? 'w-full text-left active:scale-[0.98] transition-transform duration-100 cursor-pointer'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
