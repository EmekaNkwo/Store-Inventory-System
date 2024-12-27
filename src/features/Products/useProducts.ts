import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { notification } from 'antd';

import { useProductStore } from '@/features/Products/useProductStore';
import { ApiResponse, Product } from '@/shared/models';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/product');
  const json: ApiResponse<Product[]> = await response.json();
  if (json.status === 'failed') {
    throw new Error(json.message || 'Failed to fetch products');
  }
  return json.data;
};

export const useProducts = () => {
  const [openModal, setOpenModal] = useState(false);
  const { setProducts } = useProductStore();
  const queryClient = useQueryClient();
  const productsQuery = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (productsQuery.data) {
      setProducts(productsQuery.data);
    }
  }, [productsQuery.data]);

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
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
    },
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'Product deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleDeleteProduct = (id: number) => {
    deleteProductMutation.mutate(id);
  };

  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    error: productsQuery.error,
    deleteProduct: deleteProductMutation.mutate,
    deleteSuccess: deleteProductMutation.isSuccess,
    isDeletingProduct: deleteProductMutation.isPending,

    handleDeleteProduct,
    openModal,
    setOpenModal,
  };
};
