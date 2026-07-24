'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useStaffUi } from '@/stores/staffUi';
import { useNotificationStore } from '@/stores/notificationStore';

const DROPDOWN_ITEMS = [
  { icon: '👤', label: 'Profile' },
  { icon: '🔑', label: 'Change Password' },
  { icon: '📋', label: 'Activity Log' },
  { icon: '🚪', label: 'Logout' },
];

export function StaffHeader() {
  const toggle = useStaffUi((s) => s.toggle);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          SIRKULA STAFF
        </span>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button
          aria-label={unreadCount > 0 ? `Notifikasi (${unreadCount} belum dibaca)` : 'Notifikasi'}
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

        <div className="relative ml-1" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            aria-label="User menu"
            aria-expanded={dropdownOpen}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm select-none"
            style={{ background: 'var(--color-primary)' }}
          >
            S
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
                <p className="text-xs font-semibold text-[var(--color-neutral-800)]">
                  Staff Sekolah
                </p>
                <p className="text-xs text-[var(--color-neutral-500)]">staff@sekolah.sch.id</p>
              </div>
              {DROPDOWN_ITEMS.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)] transition-colors"
                  onClick={() => setDropdownOpen(false)}
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
