import type { Offer } from './types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getOffers(
  dispensary: string,
  location: string,
  isRecreational: boolean,
): Promise<Offer[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/offers`;
  if (isRecreational) {
    url += `?menu_type=recreational`;
  } else {
    url += `?menu_type=medical`;
  }
  const response = await axios.get<Offer[]>(url);
  return response.data;
}
