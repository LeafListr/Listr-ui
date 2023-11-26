import type { Category } from "./types";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export async function getCategories(
  dispensary: string,
  location: string,
): Promise<Category[]> {
  const url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/categories`;
  const response = await axios.get<Category[]>(url);
  return response.data;
}
