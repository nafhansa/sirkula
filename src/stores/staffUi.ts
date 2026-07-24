'use client';

import { create } from 'zustand';

interface StaffUiStore {
  sidebarCollapsed: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
}

export const useStaffUi = create<StaffUiStore>((set) => ({
  sidebarCollapsed: false,
  toggle: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setCollapsed: (v) => set({ sidebarCollapsed: v }),
}));
