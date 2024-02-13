import { URLBuilder } from '../lib/createUrl';
import type { Product } from './types';
import axios from 'axios';

export async function getProductsForCategory(
  dispensary: string,
  location: string,
  isRecreational: boolean,
  category: string,
): Promise<Product[]> {
  let url = new URLBuilder()
    .withDispensary(dispensary)
    .withLocation(location)
    .forCategory(category)
    .forRecreational(isRecreational)
    .productQuery();

  const response = await axios.get<Product[]>(url);
  return response.data;
}
