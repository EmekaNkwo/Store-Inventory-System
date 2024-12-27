import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { notification } from 'antd';

import { Staff } from '@/shared/models';
import { activateOrDeactivateStaff, fetchStaffs } from '@/lib/fetchData';
import { exportToCSV } from '@/lib/exportToOptions';

import { useStaffStore } from './useStaffStore';

export const useStaff = () => {
  const [openModal, setOpenModal] = useState(false);
  const { setStaffs } = useStaffStore();
  const queryClient = useQueryClient();
  const staffsQuery = useQuery<Staff[], Error>({
    queryKey: ['staffs'],
    queryFn: fetchStaffs,
  });

  useEffect(() => {
    if (staffsQuery.data) {
      setStaffs(staffsQuery.data);
    }
  }, [staffsQuery.data]);

  const activateOrDeactivateStaffMutation = useMutation({
    mutationFn: ({ id, action }: { id: number; action: string }) => {
      return activateOrDeactivateStaff(id, action);
    },
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'Staff status updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
  });

  const handleActivateStaff = (id: number) => {
    activateOrDeactivateStaffMutation.mutate({ id, action: 'ACTIVATE' });
  };

  const handleDeactivateStaff = (id: number) => {
    activateOrDeactivateStaffMutation.mutate({ id, action: 'DEACTIVATE' });
  };

  const handleDownloadCSV = () => {
    const staffData = staffsQuery.data?.map((staff) => ({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      phoneNumber: staff.phoneNumber,
      status: staff.status,
    }));
    exportToCSV(staffData as object[], 'staffsData.csv');
  };

  return {
    staffs: staffsQuery.data ?? [],
    isLoading: staffsQuery.isLoading,
    isError: staffsQuery.isError,
    error: staffsQuery.error,
    activateOrDeactivateSuccess: activateOrDeactivateStaffMutation.isSuccess,
    isActivatingOrDeactivatingStaff:
      activateOrDeactivateStaffMutation.isPending,
    handleActivateStaff,
    handleDeactivateStaff,
    openModal,
    setOpenModal,
    handleDownloadCSV,
  };
};
