import React from 'react';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
}

export enum StaffStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum StaffRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

export interface Product {
  id: number;
  name: string;
  sku?: string;
  quantity: number;
  price: number;
  type: string;
  status: ProductStatus;
  variant?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Staff {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  phoneNumber: string;
  status?: StaffStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ApiResponse<T> {
  status: 'success' | 'failed';
  message?: string;
  data: T;
}
