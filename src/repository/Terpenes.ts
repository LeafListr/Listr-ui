import type { Terpene } from './types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export async function getTerpenes(
  dispensary: string,
  location: string,
  isRecreational: boolean,
): Promise<Terpene[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/terpenes`;
  if (isRecreational) {
    url += `?menu_type=recreational`;
  } else {
    url += `?menu_type=medical`;
  }
  const response = await axios.get<Terpene[]>(url);

  const sortedTerpenes = response.data.sort((a, b) => {
    if (!a.name || !b.name) {
      return 0;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return sortedTerpenes;
}
