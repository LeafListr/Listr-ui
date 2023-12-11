type supportedDispensary = 'curaleaf';

export type Dispensary = {
  id: supportedDispensary;
  locations?: Location[];
};

type resource =
  | 'product'
  | 'offers'
  | 'categories'
  | 'terpenes'
  | 'cannabinoids';

export type Location = {
  resources?: resource[];
  id?: string;
  name?: string;
  address?: string;
  state?: string;
  zip?: string;
};

export type Price = {
  total: number;
  discountedTotal: number;
  isDiscounted: boolean;
};

export type Cannabinoid = {
  name: string;
  description: string;
  value: number;
};

export type Terpene = {
  name: string;
  description: string;
  value: number;
};

export type Category = string;

export type Product = {
  id: string;
  brand: string;
  name: string;
  images: string[];
  category: Category;
  subcategory: string;
  variant: string;
  price: Price;
  cannabinoids: Cannabinoid[];
  terpenes: Terpene[];
};

export type Offer = {
  id: string;
  description: string;
};
