import { create } from 'zustand';

import { Staff } from '@/shared/models';

interface StaffState {
  isEditStaff: boolean;
  setIsEditStaff: (_isEditStaff: boolean) => void;
  staffs: Staff[];
  staff: Staff | null;
  setStaff: (_staff: Staff | null) => void;
  setStaffs: (_staffs: Staff[]) => void;
}

export const useStaffStore = create<StaffState>((set) => ({
  isEditStaff: false,
  setIsEditStaff: (isEditStaff: boolean) => set({ isEditStaff }),
  staffs: [],
  staff: null,
  setStaff: (staff: Staff | null) => set({ staff }),
  setStaffs: (staffs: Staff[]) => set({ staffs }),
}));
