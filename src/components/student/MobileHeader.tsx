'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HomeHeaderProps {
  schoolName: string;
}

export function HomeHeader({ schoolName }: HomeHeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 max-w-[480px] mx-auto text-white"
      style={{ background: 'var(--color-primary)' }}
    >
      {/* Status bar spacer */}
      <div style={{ height: 'env(safe-area-inset-top, 0px)' }} />

      {/* Content row */}
      <div className="flex items-center justify-between px-5 py-4">
        {/* Left: label + school */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-medium opacity-70 tracking-wide uppercase">Lokasi</span>
          <div className="flex items-center gap-1.5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="opacity-90 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="text-[17px] font-bold leading-snug tracking-tight">{schoolName}</span>
          </div>
        </div>

        {/* Right: logo circle */}
        <div
          className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          <Image
            src="/logo.png"
            alt="Sirkula"
            width={28}
            height={28}
            style={{ width: 28, height: 28, objectFit: 'contain' }}
          />
        </div>
      </div>
    </header>
  );
}

interface SubPageHeaderProps {
  title: string;
  showBack?: boolean;
}

export function MobileHeader({ title, showBack }: SubPageHeaderProps) {
  const router = useRouter();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 max-w-[480px] mx-auto bg-[var(--color-primary)] text-white"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="flex items-center h-14 px-4 gap-2">
        {showBack && (
          <button
            onClick={() => router.back()}
            aria-label="Kembali"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
        )}
        <p className="font-semibold text-base flex-1 truncate text-white">{title}</p>
      </div>
    </header>
  );
}
