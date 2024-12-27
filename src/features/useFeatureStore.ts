import { create } from 'zustand';

interface FeatureState {
  isCollapsed: boolean;
  setIsCollapsed: (_isCollapsed: boolean) => void;
}

export const useFeatureStore = create<FeatureState>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
}));
