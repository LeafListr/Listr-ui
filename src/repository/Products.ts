import type {Product} from "./types";
import axios from "axios";

export async function getProducts(dispensary: string, location: string): Promise<Product[]> {
    const url = `/api/v1/dispensaries/${dispensary}/locations/${location}/products`
    const response = await axios.get<Product[]>(url);
    return response.data;
}
