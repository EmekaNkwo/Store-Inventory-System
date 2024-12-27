import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

import { ApiResponse, Staff, StaffRole } from '@/shared/models';

import { useStaffStore } from '../useStaffStore';

interface IAddStaff {
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
}
const useAddStaff = () => {
  const initialState: IAddStaff = {
    name: '',
    role: '',
    email: '',
    phoneNumber: '',
  };
  const [addStaffState, setAddStaffState] = useState<IAddStaff>(initialState);
  const [editStaffState, setEditStaffState] = useState<IAddStaff>(initialState);

  const queryClient = useQueryClient();

  const { staff } = useStaffStore((state) => state);

  useEffect(() => {
    if (staff) {
      setEditStaffState({
        name: staff.name,
        role: staff.role,
        email: staff.email,
        phoneNumber: staff.phoneNumber,
      });
    }
  }, [staff]);

  const addStaffMutation = useMutation({
    mutationFn: async (newStaff: Omit<Staff, 'id'>) => {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });
      const json: ApiResponse<Staff> = await response.json();
      if (json.status === 'failed') {
        notification.error({
          message: 'Error',
          description: json.message,
        });
        throw new Error(json.message || 'Failed to add product');
      }
      return json.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'Staff added successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
  });

  const updateStaffMutation = useMutation({
    mutationFn: async (staff: Staff) => {
      const response = await fetch('/api/staff', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staff),
      });
      const json: ApiResponse<Staff> = await response.json();
      if (json.status === 'failed') {
        notification.error({
          message: 'Error',
          description: json.message,
        });
        throw new Error(json.message || 'Failed to update product');
      }
      return json.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'Staff updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
  });

  const handleAddStaff = () => {
    addStaffMutation.mutate({
      name: addStaffState.name,
      role: addStaffState.role as StaffRole,
      email: addStaffState.email,
      phoneNumber: addStaffState.phoneNumber,
    });
  };

  const handleUpdateStaff = () => {
    updateStaffMutation.mutate({
      name: editStaffState.name,
      role: editStaffState.role as StaffRole,
      email: editStaffState.email,
      phoneNumber: editStaffState.phoneNumber,
      id: Number(staff?.id),
    });
  };

  return {
    handleAddStaff,
    addSuccess: addStaffMutation.isSuccess,

    handleUpdateStaff,
    updateSuccess: updateStaffMutation.isSuccess,
    isAddingStaff: addStaffMutation.isPending,
    isUpdatingStaff: updateStaffMutation.isPending,

    addStaffState,
    setAddStaffState,

    editStaffState,
    setEditStaffState,
  };
};

export default useAddStaff;
