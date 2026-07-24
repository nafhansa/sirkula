import Image from 'next/image';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  src?: string | undefined;
  size?: AvatarSize;
}

const SIZE_PX: Record<AvatarSize, number> = { sm: 32, md: 48, lg: 80 };
const SIZE_TEXT: Record<AvatarSize, string> = { sm: 'text-xs', md: 'text-base', lg: 'text-2xl' };

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const px = SIZE_PX[size];

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={px}
        height={px}
        className="rounded-full object-cover"
        style={{ width: px, height: px }}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white select-none ${SIZE_TEXT[size]}`}
      style={{ width: px, height: px, background: 'var(--color-primary)' }}
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
}
