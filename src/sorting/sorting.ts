import type { Product } from '../repository/types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function sorter(
  dispensary: string,
  location: string,
  isRecreational: boolean,
  category: string,
  sort: string,
  terp1: string,
  terp2: string,
  terp3: string,
): Promise<Product[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/products?category=${category}`;
  if (isRecreational) {
    url = url.concat('&menu_type=recreational');
  } else {
    url = url.concat('&menu_type=medical');
  }
  if (sort) {
    url = url.concat(`&sort=${sort}`);
  }
  if (terp1) {
    url = url.concat(`&terp1=${terp1}`);
  }
  if (terp2) {
    url = url.concat(`&terp2=${terp2}`);
  }
  if (terp3) {
    url = url.concat(`&terp3=${terp3}`);
  }

  const response = await axios.get<Product[]>(url);
  return response.data;
}
