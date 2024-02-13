import { URLBuilder } from '../lib/createUrl';
import type { Dispensary, Location } from './types.ts';
import axios from 'axios';

export async function getDispensaries(
  isRecreational: boolean,
): Promise<Dispensary[]> {
  const url = new URLBuilder()
    .forRecreational(isRecreational)
    .dispensariesQuery();

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
  const url = new URLBuilder()
    .withDispensary(dispensary)
    .forRecreational(isRecreational)
    .locationsQuery();

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
