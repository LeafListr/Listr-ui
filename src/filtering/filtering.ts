import type { Product } from '../repository/types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function filter(
  dispensary: string,
  location: string,
  category: string,
  variant: string,
  subcategory: string,
  minPrice: number,
  maxPrice: number,
): Promise<Product[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/products?category=${category}`;
  if (subcategory) {
    url = url.concat(`&sub=${subcategory}`);
  }
  if (variant) {
    url = url.concat(`&variants=${variant}`);
  }
  if (minPrice || minPrice === 0) {
    url = url.concat(`&min_price=${minPrice}`);
  }
  if (maxPrice) {
    url = url.concat(`&max_price=${maxPrice}`);
  }

  const response = await axios.get<Product[]>(url);
  return response.data;
}
