import { writable } from 'svelte/store';
import type { Product } from './types';

export const dispensaryStore = writable({
  dispensary: '',
  location: '',
});

export const productStore = writable({
  products: [] as Product[],
  variant: '',
  category: '',
  subcategory: '',
});
