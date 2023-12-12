import type { Category } from './types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export async function getCategories(
  dispensary: string,
  location: string,
  isRecreational: boolean,
): Promise<Category[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/categories`;
  if (isRecreational) {
    url += `?menu_type=recreational`;
  } else {
    url += `?menu_type=medical`;
  }
  const response = await axios.get<Category[]>(url);
  return response.data;
}
