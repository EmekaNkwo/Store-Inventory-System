import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { notification } from 'antd';

import { useProductStore } from '@/features/Products/useProductStore';
import { Product } from '@/shared/models';
import { deleteProduct, fetchProducts } from '@/lib/fetchData';

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
    mutationFn: (id: number) => {
      return deleteProduct(id);
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
