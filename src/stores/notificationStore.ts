'use client';

import { create } from 'zustand';

export interface AppNotification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: AppNotification[];
  unreadCount: number;
  push: (message: string) => void;
  markAllRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [
    {
      id: '1',
      message: 'Sekolah baru berhasil di-onboard',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      message: '3 redemption menunggu diproses',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      message: 'Laporan FMCG bulanan siap diunduh',
      read: false,
      createdAt: new Date().toISOString(),
    },
  ],
  unreadCount: 3,
  push: (message) =>
    set((s) => ({
      notifications: [
        { id: crypto.randomUUID(), message, read: false, createdAt: new Date().toISOString() },
        ...s.notifications,
      ],
      unreadCount: s.unreadCount + 1,
    })),
  markAllRead: () =>
    set(() => ({
      notifications: get().notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));
