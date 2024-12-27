import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

import { ApiResponse, Product, ProductStatus } from '@/shared/models';
import { useProductStore } from '@/features/Products/useProductStore';

interface IAddProduct {
  name: string;
  quantity: string;
  price: string;
  type: string;
  status?: ProductStatus;
  variant?: string;
}
const useAddProduct = () => {
  const initialState: IAddProduct = {
    name: '',
    quantity: '',
    price: '',
    type: '',
    status: ProductStatus.ACTIVE,
    variant: '',
  };
  const [addProductState, setAddProductState] =
    useState<IAddProduct>(initialState);
  const [editProductState, setEditProductState] =
    useState<IAddProduct>(initialState);

  const queryClient = useQueryClient();

  const { product } = useProductStore((state) => state);

  useEffect(() => {
    if (product) {
      setEditProductState({
        name: product.name,
        quantity: String(product.quantity),
        price: String(product.price),
        type: product.type,
        status: product.status,
        variant: product.variant,
      });
    }
  }, [product]);

  const addProductMutation = useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id'>) => {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const json: ApiResponse<Product> = await response.json();
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
        description: 'Product added successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (product: Product) => {
      const response = await fetch('/api/product', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const json: ApiResponse<Product> = await response.json();
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
        description: 'Product updated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleAddProduct = () => {
    addProductMutation.mutate({
      name: addProductState.name,
      quantity: Number(addProductState.quantity),
      price: Number(addProductState.price),
      type: addProductState.type,
      status: addProductState.status as ProductStatus,
      variant: addProductState.variant,
    });
  };

  const handleUpdateProduct = () => {
    updateProductMutation.mutate({
      name: editProductState.name,
      quantity: Number(editProductState.quantity),
      price: Number(editProductState.price),
      type: editProductState.type,
      status: editProductState.status as ProductStatus,
      variant: editProductState.variant,
      id: Number(product?.id),
      sku: product?.sku,
    });
  };

  return {
    handleAddProduct,
    addSuccess: addProductMutation.isSuccess,

    handleUpdateProduct,
    updateSuccess: updateProductMutation.isSuccess,
    isAddingProduct: addProductMutation.isPending,
    isUpdatingProduct: updateProductMutation.isPending,

    addProductState,
    setAddProductState,

    editProductState,
    setEditProductState,
  };
};

export default useAddProduct;
