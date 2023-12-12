import type { Dispensary, Location } from './types.ts';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getDispensaries(
  isRecreational: boolean,
): Promise<Dispensary[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries`;
  if (isRecreational) {
    url += `?menu_type=recreational`;
  } else {
    url += `?menu_type=medical`;
  }
  const response = await axios.get<Dispensary[]>(url);

  return response.data;
}

export async function getDispensaryLocations(
  dispensary: string,
  isRecreational: boolean,
): Promise<Location[]> {
  if (!dispensary) {
    return [];
  }
  let url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations`;
  if (isRecreational) {
    url += `?menu_type=recreational`;
  } else {
    url += `?menu_type=medical`;
  }
  const response = await axios.get<Location[]>(url);

  const sortedLocations = response.data.sort((a, b) => {
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
  return sortedLocations;
}
