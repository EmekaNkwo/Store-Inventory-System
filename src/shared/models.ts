import React from 'react';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
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

export interface ModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ApiResponse<T> {
  status: 'success' | 'failed';
  message?: string;
  data: T;
}
