'use client';

import { usePathname } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAdminUi } from '@/stores/adminUi';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useAdminUi((s) => s.sidebarCollapsed);
  const pathname = usePathname();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-neutral-100)' }}>
      <AdminHeader />
      <AdminSidebar />
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
