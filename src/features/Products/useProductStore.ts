import { create } from 'zustand';

import { Product } from '@/shared/models';

interface ProductState {
  isEditProduct: boolean;
  setIsEditProduct: (_isEditProduct: boolean) => void;
  products: Product[];
  product: Product | null;
  setProduct: (_product: Product | null) => void;
  setProducts: (_products: Product[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  isEditProduct: false,
  setIsEditProduct: (isEditProduct: boolean) => set({ isEditProduct }),
  products: [],
  product: null,
  setProduct: (product: Product | null) => set({ product }),
  setProducts: (products: Product[]) => set({ products }),
}));
