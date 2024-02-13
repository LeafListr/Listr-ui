import { URLBuilder } from '../lib/createUrl';
import type { Offer } from './types';
import axios from 'axios';

export async function getOffers(
  dispensary: string,
  location: string,
  isRecreational: boolean,
): Promise<Offer[]> {
  let url = new URLBuilder()
    .withDispensary(dispensary)
    .withLocation(location)
    .forRecreational(isRecreational)
    .offersQuery();
  const response = await axios.get<Offer[]>(url);
  return response.data;
}
