import { URLBuilder } from '../lib/createUrl';
import type { Terpene } from './types';
import axios from 'axios';

export async function getTerpenes(
  dispensary: string,
  location: string,
  isRecreational: boolean,
): Promise<Terpene[]> {
  const url = new URLBuilder()
    .withDispensary(dispensary)
    .withLocation(location)
    .forRecreational(isRecreational)
    .terpenesQuery();

  const response = await axios.get<Terpene[]>(url);

  // TODO stop this, handle on backend
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
