'use client';

import { usePathname } from 'next/navigation';
import { BottomTabBar } from '@/components/student/BottomTabBar';
import { OfflineBanner } from '@/components/student/OfflineBanner';
import { ServiceWorkerProvider } from '@/components/ServiceWorkerProvider';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className="min-h-dvh max-w-[480px] mx-auto relative overflow-hidden"
      style={{ background: '#F2F5F2' }}
    >
      <ServiceWorkerProvider />
      {/* Decorative recycling arrows background */}
      <div
        className="pointer-events-none fixed inset-0 max-w-[480px] mx-auto overflow-hidden z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          className="absolute -bottom-16 -left-20 w-72 h-72 opacity-[0.07]"
          fill="var(--color-primary)"
        >
          <path d="M200 40 L280 120 L240 120 L240 200 L320 200 L320 160 L400 240 L320 320 L320 280 L160 280 L160 320 L80 240 L160 160 L160 200 L200 200 L200 120 L160 120 Z" />
        </svg>
        <svg
          viewBox="0 0 400 400"
          className="absolute -top-20 -right-16 w-64 h-64 opacity-[0.06]"
          fill="var(--color-primary)"
        >
          <path d="M200 40 L280 120 L240 120 L240 200 L320 200 L320 160 L400 240 L320 320 L320 280 L160 280 L160 320 L80 240 L160 160 L160 200 L200 200 L200 120 L160 120 Z" />
        </svg>
      </div>

      <main
        className="relative z-10 pb-[calc(var(--bottom-tab-height)+env(safe-area-inset-bottom,0px))]"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 72px)' }}
      >
        <OfflineBanner />
        <div key={pathname} className="page-transition">
          {children}
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
