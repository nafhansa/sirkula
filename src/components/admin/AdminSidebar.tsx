'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAdminUi } from '@/stores/adminUi';

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href?: string | undefined;
  children?: NavChild[] | undefined;
}

const NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', href: '/admin' },
  { id: 'waste-approvals', label: 'Waste Approvals', icon: '✅', href: '/admin/waste-approvals' },
  {
    id: 'schools',
    label: 'Schools',
    icon: '🏫',
    children: [
      { label: 'All Schools', href: '/admin/schools' },
      { label: 'Onboard New', href: '/admin/schools/new' },
      { label: 'Performance', href: '/admin/schools/performance' },
    ],
  },
  {
    id: 'fmcg',
    label: 'FMCG Companies',
    icon: '🏢',
    children: [
      { label: 'Active Contracts', href: '/admin/companies' },
      { label: 'Subscriptions', href: '/admin/companies/subscriptions' },
      { label: 'API Keys', href: '/admin/companies/api-keys' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '📊',
    children: [
      { label: 'Brand Audit', href: '/admin/reports/brand-audit' },
      { label: 'Financial', href: '/admin/reports/financial' },
      { label: 'System Health', href: '/admin/reports/health' },
    ],
  },
  {
    id: 'financial',
    label: 'Financial',
    icon: '💰',
    children: [
      { label: 'Reconciliation', href: '/admin/financial/reconciliation' },
      { label: 'Payouts', href: '/admin/financial/payouts' },
      { label: 'Revenue', href: '/admin/financial/revenue' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    children: [
      { label: 'System Config', href: '/admin/settings' },
      { label: 'Users', href: '/admin/settings/users' },
      { label: 'Audit Logs', href: '/admin/settings/audit' },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggle } = useAdminUi();
  // Track items the user has manually toggled; undefined = auto (derived from pathname)
  const [userToggles, setUserToggles] = useState<Record<string, boolean>>({});

  const isMenuOpen = (item: NavItem): boolean => {
    if (item.id in userToggles) return userToggles[item.id] ?? false;
    return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
  };

  const toggleMenu = (item: NavItem) => {
    setUserToggles((prev) => ({ ...prev, [item.id]: !isMenuOpen(item) }));
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

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
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3" aria-label="Admin navigation">
        {NAV.map((item) => {
          const hasChildren = !!item.children?.length;
          const isExpanded = isMenuOpen(item);
          const childActive = item.children?.some((c) => isActive(c.href)) ?? false;
          const selfActive = item.href ? isActive(item.href) : false;
          const highlighted = selfActive || childActive;

          return (
            <div key={item.id}>
              {/* Parent row */}
              {item.href && !hasChildren ? (
                <Link
                  href={item.href}
                  className={[
                    'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-colors',
                    highlighted
                      ? 'bg-[var(--color-primary-lighter)] text-[var(--color-primary-dark)]'
                      : 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-50)]',
                  ].join(' ')}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              ) : (
                <button
                  onClick={() => !sidebarCollapsed && toggleMenu(item)}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-colors',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]',
                    highlighted
                      ? 'bg-[var(--color-primary-lighter)] text-[var(--color-primary-dark)]'
                      : 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-50)]',
                  ].join(' ')}
                  style={{ width: 'calc(100% - 16px)' }}
                  aria-expanded={!sidebarCollapsed ? isExpanded : undefined}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                      >
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    </>
                  )}
                </button>
              )}

              {/* Sub-menu */}
              {!sidebarCollapsed && hasChildren && isExpanded && (
                <div className="ml-4 mt-0.5 mb-1 pl-4 border-l-2 border-[var(--color-neutral-200)]">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={[
                        'flex items-center py-2 px-2 text-xs rounded-md transition-colors',
                        isActive(child.href)
                          ? 'text-[var(--color-primary)] font-semibold'
                          : 'text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-800)]',
                      ].join(' ')}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
