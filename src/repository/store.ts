import { writable } from 'svelte/store';
import type { Product } from './types';

export type dispensaryStoreFields = {
  dispensary: string;
  location: string;
  isRecreational: boolean;
};

export type productStoreFields = {
  products: Product[];
  productsLoading: boolean;
  variant: string;
  category: string;
  subcategory: string;
};

export type transformStoreFields = {
  priceSortMethod: string;
  thcSortMethod: string;
  terp1: string;
  terp2: string;
  terp3: string;
  variants: string;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  excludedBrands: string;
  includedBrands: string;
};

export const dispensaryStore = writable({
  dispensary: '',
  location: '',
  isRecreational: false,
} as dispensaryStoreFields);

export const productStore = writable({
  products: [] as Product[],
  productsLoading: false,
  variant: '',
  category: '',
  subcategory: '',
} as productStoreFields);

export const transformStore = writable({
  priceSortMethod: '',
  thcSortMethod: '',
  terp1: '',
  terp2: '',
  terp3: '',
  variants: '',
  subcategory: '',
  minPrice: 0,
  maxPrice: 0,
  excludedBrands: '',
  includedBrands: '',
} as transformStoreFields);
