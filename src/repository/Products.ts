import type { Product } from './types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getProductsForCategory(
  dispensary: string,
  location: string,
  category: string,
): Promise<Product[]> {
  const url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/products?category=${category}`;
  const response = await axios.get<Product[]>(url);
  return response.data;
}
