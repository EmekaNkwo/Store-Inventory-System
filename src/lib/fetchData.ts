import { notification } from 'antd';

import { ApiResponse, Staff } from '@/shared/models';

export const fetchStaffs = async (): Promise<Staff[]> => {
  const response = await fetch('/api/staff');
  const json: ApiResponse<Staff[]> = await response.json();
  if (json.status === 'failed') {
    throw new Error(json.message || 'Failed to fetch staffs');
  }
  return json.data;
};

export const activateOrDeactivateStaff = async (
  id: number,
  action: string
): Promise<Staff> => {
  const response = await fetch('/api/staff/activate', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, action }),
  });
  const json: ApiResponse<Staff> = await response.json();
  if (json.status === 'failed') {
    notification.error({
      message: 'Error',
      description: json.message,
    });
    throw new Error(json.message || 'Failed to update staff status');
  }
  return json.data;
};
