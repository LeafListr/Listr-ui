import type { Product } from "../repository/types";

export const loadingProduct: Product = {
  id: "Loading Id...",
  name: "Loading Name...",
  category: "Loading Category...",
  images: ["loading.gif"],
  terpenes: [{ name: "Loading Terpenes...", value: 0, description: "" }],
  cannabinoids: [
    { name: "Loading Cannabinoids...", value: 0, description: "" },
  ],
  variants: [
    {
      name: "Loading Variants...",
      price: { total: 0, discountedTotal: 0 },
    },
  ],
};
