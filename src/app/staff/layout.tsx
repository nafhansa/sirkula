'use client';

import { usePathname } from 'next/navigation';
import { StaffHeader } from '@/components/staff/StaffHeader';
import { StaffSidebar } from '@/components/staff/StaffSidebar';
import { useStaffUi } from '@/stores/staffUi';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useStaffUi((s) => s.sidebarCollapsed);
  const pathname = usePathname();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-neutral-100)' }}>
      <StaffHeader />
      <StaffSidebar />
      <main
        className="transition-all duration-300 min-h-screen"
        style={{
          paddingTop: 64,
          marginLeft: sidebarCollapsed ? 64 : 280,
        }}
      >
        <div key={pathname} className="p-6 max-w-[1400px] page-transition">
          {children}
        </div>
      </main>
    </div>
  );
}
