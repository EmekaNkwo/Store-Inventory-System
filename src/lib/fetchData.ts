import { notification } from 'antd';

import { ApiResponse, DashboardData, Product, Staff } from '@/shared/models';

//Products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/product');
  const json: ApiResponse<Product[]> = await response.json();
  if (json.status === 'failed') {
    throw new Error(json.message || 'Failed to fetch products');
  }
  return json.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const response = await fetch('/api/product', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  const json: ApiResponse<Product> = await response.json();
  if (json.status === 'failed') {
    notification.error({
      message: 'Error',
      description: json.message,
    });
    throw new Error(json.message || 'Failed to delete product');
  }
  return json.data;
};

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

export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await fetch('/api/dashboard', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const json: ApiResponse<DashboardData> = await response.json();
  if (json.status === 'failed') {
    throw new Error(json.message || 'Failed to fetch dashboard data');
  }
  return json.data;
};
