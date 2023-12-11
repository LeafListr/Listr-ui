import type { Product } from '../repository/types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function filter(
  dispensary: string,
  location: string,
  category: string,
  variants: string,
  subcategory: string,
  minPrice: number,
  maxPrice: number,
  excludedBrands: string,
  includedBrands: string,
): Promise<Product[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/products?category=${category}`;
  if (subcategory) {
    url = url.concat(`&sub=${subcategory}`);
  }
  if (variants) {
    url = url.concat(`&variants=${variants}`);
  }
  if (minPrice || minPrice === 0) {
    url = url.concat(`&min_price=${minPrice}`);
  }
  if (maxPrice) {
    url = url.concat(`&max_price=${maxPrice}`);
  }
  if (excludedBrands) {
    url = url.concat(`&not_brands=${excludedBrands}`);
  }
  if (includedBrands) {
    url = url.concat(`&brands=${includedBrands}`);
  }

  const response = await axios.get<Product[]>(url);
  return response.data;
}
