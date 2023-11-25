import type {Product} from "./types";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getProducts(dispensary: string, location: string): Promise<Product[]> {
    const url = `${apiBaseUrl}/api/v1/dispensaries/${dispensary}/locations/${location}/products`
    const response = await axios.get<Product[]>(url);
    return response.data;
}
