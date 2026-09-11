export type CategorySlug =
  | "murukku"
  | "achappam"
  | "chips"
  | "namkeen";

export interface Category {
  id?: string;
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  /** Weight in grams — omitted for count-based ("Nos") products */
  weightGrams?: number;
  price: number;
  /** Compare-at / original price before discount */
  originalPrice?: number;
  sku: string;
  stock: number;
  inStock: boolean;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  categorySlug: CategorySlug;
  images: ProductImage[];
  variants: ProductVariant[];
  /** Active products appear in store */
  active: boolean;
  /** Flag while business details are pending confirmation */
  detailsPending?: boolean;
  tags: string[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}
