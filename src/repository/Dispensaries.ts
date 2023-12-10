import type { Dispensary, Location } from './types.ts';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getDispensaries(): Promise<Dispensary[]> {
  const url = `${apiBaseUrl}/api/v1/dispensaries`;
  const response = await axios.get<Dispensary[]>(url);

  return response.data;
}

export async function getDispensaryLocations(
  dispensary: string,
): Promise<Location[]> {
  const url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations`;
  const response = await axios.get<Location[]>(url);

  return response.data;
}
