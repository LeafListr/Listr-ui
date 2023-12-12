import type { Product } from './types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getProductsForCategory(
  dispensary: string,
  location: string,
  isRecreational: boolean,
  category: string,
): Promise<Product[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/products?category=${category}`;
  if (isRecreational) {
    url += `&menu_type=recreational`;
  } else {
    url += `&menu_type=medical`;
  }
  const response = await axios.get<Product[]>(url);
  return response.data;
}
