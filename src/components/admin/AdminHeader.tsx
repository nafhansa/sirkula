'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminUi } from '@/stores/adminUi';
import { useNotificationStore } from '@/stores/notificationStore';

const DROPDOWN_ITEMS = [
  { icon: '👤', label: 'Profile' },
  { icon: '🔑', label: 'Change Password' },
  { icon: '📋', label: 'Activity Log' },
  { icon: '🚪', label: 'Logout' },
];

export function AdminHeader() {
  const router = useRouter();
  const toggle = useAdminUi((s) => s.toggle);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleItemClick = async (label: string) => {
    setDropdownOpen(false);
    if (label === 'Logout') {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    }
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-white flex items-center px-4 gap-3"
      style={{
        borderBottom: '1px solid var(--color-neutral-200)',
        boxShadow: 'var(--shadow-admin-sm)',
      }}
    >
      {/* Sidebar toggle */}
      <button
        onClick={toggle}
        aria-label="Toggle sidebar"
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--color-neutral-100)] transition-colors shrink-0"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[var(--color-neutral-600)]"
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      {/* Logo + wordmark */}
      <div className="flex items-center gap-2.5 select-none">
        <Image
          src="/logo.png"
          alt="Sirkula"
          width={28}
          height={28}
          style={{ width: 28, height: 28 }}
        />
        <span
          className="font-bold text-sm tracking-widest hidden sm:block"
          style={{ color: 'var(--color-primary-dark)' }}
        >
          SIRKULA ADMIN
        </span>
      </div>

      {/* Right controls */}
      <div className="ml-auto flex items-center gap-1">
        {/* Notification */}
        <button
          aria-label={unreadCount > 0 ? `Notifications (${unreadCount} unread)` : 'Notifications'}
          onClick={markAllRead}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--color-neutral-100)] transition-colors relative"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[var(--color-neutral-600)]"
          >
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          {unreadCount > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: 'var(--color-danger)' }}
              aria-hidden="true"
            />
          )}
        </button>

        {/* Settings */}
        <button
          aria-label="Settings"
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--color-neutral-100)] transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[var(--color-neutral-600)]"
          >
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
          </svg>
        </button>

        {/* User avatar dropdown */}
        <div className="relative ml-1" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            aria-label="User menu"
            aria-expanded={dropdownOpen}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm select-none"
            style={{ background: 'var(--color-primary)' }}
          >
            A
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 top-11 w-48 bg-white rounded-xl py-1 z-50"
              style={{
                boxShadow: 'var(--shadow-admin-md)',
                border: '1px solid var(--color-neutral-200)',
              }}
            >
              <div className="px-3 py-2 border-b border-[var(--color-neutral-100)]">
                <p className="text-xs font-semibold text-[var(--color-neutral-800)]">Admin User</p>
                <p className="text-xs text-[var(--color-neutral-500)]">admin@sirkula.id</p>
              </div>
              {DROPDOWN_ITEMS.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)] transition-colors"
                  onClick={() => void handleItemClick(item.label)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
