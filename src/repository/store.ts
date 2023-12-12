import { writable } from 'svelte/store';
import type { Product } from './types';

export const dispensaryStore = writable({
  dispensary: '',
  location: '',
  isRecreational: false,
});

export const productStore = writable({
  products: [] as Product[],
  productsLoading: false,
  variant: '',
  category: '',
  subcategory: '',
});
