import { URLBuilder } from '../lib/createUrl';
import type { Category } from './types';
import axios from 'axios';

export async function getCategories(
  dispensary: string,
  location: string,
  isRecreational: boolean,
): Promise<Category[]> {
  const url = new URLBuilder()
    .withDispensary(dispensary)
    .withLocation(location)
    .forRecreational(isRecreational)
    .categoriesQuery();

  const response = await axios.get<Category[]>(url);
  return response.data;
}
