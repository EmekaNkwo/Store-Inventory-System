import { create } from 'zustand';

import { DashboardData } from '@/shared/models';

interface DashboardState {
  dashboardData: DashboardData | null;
  setDashboardData: (_dashboardData: DashboardData | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardData: null,
  setDashboardData: (dashboardData: DashboardData | null) =>
    set({ dashboardData }),
}));
