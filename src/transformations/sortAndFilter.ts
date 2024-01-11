import type {
  dispensaryStoreFields,
  productStoreFields,
  transformStoreFields,
} from '../repository/store';
import type { Product } from '../repository/types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

type requestParams = {
  dispensary: string;
  location: string;
  isRecreational: boolean;
  category: string;
};

type sortParams = {
  priceSortMethod: string;
  thcSortMethod: string;
  terp1: string;
  terp2: string;
  terp3: string;
};

type filterParams = {
  variants: string;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  excludedBrands: string;
  includedBrands: string;
};

type sortAndFilterParams = {
  sort: sortParams;
  filter: filterParams;
  request: requestParams;
};

export function newSortAndFilterParams(
  dStore: dispensaryStoreFields,
  pStore: productStoreFields,
  tStore: transformStoreFields,
) {
  return {
    request: {
      dispensary: dStore.dispensary,
      location: dStore.location,
      isRecreational: dStore.isRecreational,
      category: pStore.category,
    },
    sort: {
      priceSortMethod: tStore.priceSortMethod,
      thcSortMethod: tStore.thcSortMethod,
      terp1: tStore.terp1,
      terp2: tStore.terp2,
      terp3: tStore.terp3,
    },
    filter: {
      variants: tStore.variants,
      subcategory: tStore.subcategory,
      minPrice: tStore.minPrice,
      maxPrice: tStore.maxPrice,
      excludedBrands: tStore.excludedBrands,
      includedBrands: tStore.includedBrands,
    },
  };
}

export async function sortAndFilter(
  params: sortAndFilterParams,
): Promise<Product[]> {
  let url = `${apiBaseUrl}/api/v1/dispensaries/${params.request.dispensary}/locations/${params.request.location}/products?category=${params.request.category}`;
  if (params.request.isRecreational) {
    url = url.concat('&menu_type=recreational');
  } else {
    url = url.concat('&menu_type=medical');
  }
  if (params.sort.priceSortMethod) {
    url = url.concat(`&price_sort=${params.sort.priceSortMethod}`);
  }
  if (params.sort.thcSortMethod) {
    url = url.concat(`&thc_sort=${params.sort.thcSortMethod}`);
  }
  if (params.sort.terp1) {
    url = url.concat(`&terp1=${params.sort.terp1}`);
  }
  if (params.sort.terp2) {
    url = url.concat(`&terp2=${params.sort.terp2}`);
  }
  if (params.sort.terp3) {
    url = url.concat(`&terp3=${params.sort.terp3}`);
  }
  if (params.filter.variants) {
    url = url.concat(`&variants=${params.filter.variants}`);
  }
  if (params.filter.subcategory) {
    url = url.concat(`&sub=${params.filter.subcategory}`);
  }
  if (params.filter.minPrice) {
    url = url.concat(`&min_price=${params.filter.minPrice}`);
  }
  if (params.filter.maxPrice) {
    url = url.concat(`&max_price=${params.filter.maxPrice}`);
  }
  if (params.filter.excludedBrands) {
    url = url.concat(`&not_brands=${params.filter.excludedBrands}`);
  }
  if (params.filter.includedBrands) {
    url = url.concat(`&brands=${params.filter.includedBrands}`);
  }

  const response = await axios.get<Product[]>(url);
  return response.data;
}
