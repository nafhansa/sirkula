'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStaffUi } from '@/stores/staffUi';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/staff' },
  { id: 'students', label: 'Students', icon: '👥', href: '/staff/students' },
  { id: 'rewards', label: 'Manage Rewards', icon: '🎁', href: '/staff/rewards' },
  { id: 'redemptions', label: 'Redemptions', icon: '📋', href: '/staff/redemptions' },
  { id: 'reports', label: 'Reports', icon: '📈', href: '/staff/reports' },
  { id: 'settings', label: 'Settings', icon: '⚙️', href: '/staff/settings' },
];

export function StaffSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggle } = useStaffUi();

  const isActive = (href: string) =>
    href === '/staff' ? pathname === '/staff' : pathname.startsWith(href);

  const width = sidebarCollapsed ? 64 : 280;

  return (
    <aside
      className="fixed left-0 bottom-0 bg-white flex flex-col overflow-hidden transition-all duration-300 z-40"
      style={{
        top: 64,
        width,
        borderRight: '1px solid var(--color-neutral-200)',
        boxShadow: 'var(--shadow-admin-sm)',
      }}
    >
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3" aria-label="Staff navigation">
        {NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={[
                'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-[var(--color-primary-lighter)] text-[var(--color-primary-dark)]'
                  : 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-50)]',
              ].join(' ')}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={toggle}
        className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-50)] transition-colors shrink-0"
        style={{ borderTop: '1px solid var(--color-neutral-200)' }}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        {!sidebarCollapsed && <span>Collapse</span>}
      </button>
    </aside>
  );
}
