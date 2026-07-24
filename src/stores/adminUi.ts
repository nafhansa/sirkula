'use client';

import { create } from 'zustand';

interface AdminUiStore {
  sidebarCollapsed: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
}

export const useAdminUi = create<AdminUiStore>((set) => ({
  sidebarCollapsed: false,
  toggle: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setCollapsed: (v) => set({ sidebarCollapsed: v }),
}));
