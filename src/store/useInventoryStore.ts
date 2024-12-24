import { create } from 'zustand';

import { Product } from '@/shared/models';

interface InventoryState {
  products: Product[];
  product: Product | null;
  setProduct: (_product: Product | null) => void;
  setProducts: (_products: Product[]) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  products: [],
  product: null,
  setProduct: (product: Product | null) => set({ product }),
  setProducts: (products: Product[]) => set({ products }),
}));
