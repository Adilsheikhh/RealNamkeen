import type { Category, Product } from "@/types/product";

/**
 * Product data layer.
 *
 * Currently backed by in-memory mock data so the UI can be developed
 * before the database is wired in. Every function returns the same
 * shapes that the Prisma-backed implementation will provide, so the UI
 * does not need to change when we swap the data source.
 *
 * Business details (names, prices, weights, descriptions, ingredients,
 * stock) are pending confirmation unless supplied separately.
 */

export const categories: Category[] = [
  {
    slug: "murukku",
    name: "Murukku",
    description:
      "Classic crisp, spiral-shaped savoury snacks made the traditional way.",
    image: "/images/products/murukku/murukku-pack.jpg",
  },
  {
    slug: "achappam",
    name: "Achappam",
    description:
      "Light, crunchy traditional rose cookies with a delicate sweetness.",
    image: "/images/products/achappam/achappam-pack.jpg",
  },
  {
    slug: "chips",
    name: "Chips",
    description: "Crispy, golden potato and banana chips.",
    image: "/images/hero/murukku-lifestyle.jpg",
  },
  {
    slug: "namkeen",
    name: "Namkeen",
    description: "Classic spiced Indian savoury snacks.",
    image: "/images/products/murukku/murukku-pack.jpg",
  },
  {
    slug: "mixtures",
    name: "Mixtures",
    description: "Nutty, crunchy blends made for sharing.",
    image: "/images/hero/murukku-lifestyle.jpg",
  },
];

export const products: Product[] = [
  {
    id: "prod_murukku",
    name: "Traditional Murukku",
    slug: "traditional-murukku",
    tagline: "Crisp, lightly spiced spiral savoury",
    description:
      "Our signature Traditional Murukku is hand-crafted to a time-honoured recipe using rice flour, urad dal and carefully roasted spices. Each spiral is fried to a golden, irresistibly crisp finish.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/murukku/murukku-pack.jpg",
        alt: "Real Foods Traditional Murukku pack",
      },
    ],
    variants: [
      {
        id: "var_murukku_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 60,
        sku: "RF-MUR-200",
        stock: 120,
        inStock: true,
      },
      {
        id: "var_murukku_400",
        name: "400g Family Pack",
        size: "400g",
        weightGrams: 400,
        price: 110,
        originalPrice: 120,
        sku: "RF-MUR-400",
        stock: 80,
        inStock: true,
      },
    ],
    active: true,
    detailsPending: true,
    tags: ["bestseller", "south-indian"],
  },
  {
    id: "prod_achappam",
    name: "Rose Achappam",
    slug: "rose-achappam",
    tagline: "Delicate, crunchy traditional rose cookies",
    description:
      "Rose Achappam are delicate, floral-patterned traditional treats made with rice flour and coconut milk. Light, crispy and gently sweet — a festive special turned everyday classic.",
    categorySlug: "achappam",
    images: [
      {
        url: "/images/products/achappam/achappam-pack.jpg",
        alt: "Real Foods Rose Achappam pack",
      },
    ],
    variants: [
      {
        id: "var_achappam_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 75,
        sku: "RF-ACH-200",
        stock: 90,
        inStock: true,
      },
      {
        id: "var_achappam_400",
        name: "400g Family Pack",
        size: "400g",
        weightGrams: 400,
        price: 140,
        originalPrice: 150,
        sku: "RF-ACH-400",
        stock: 45,
        inStock: true,
      },
    ],
    active: true,
    detailsPending: true,
    tags: ["festive", "south-indian"],
  },
  {
    id: "prod_chips_banana",
    name: "Banana Chips",
    slug: "banana-chips",
    tagline: "Thin, crispy, naturally golden banana chips",
    description:
      "Hand-sliced ripe bananas fried to a delicate crunch. A light, wholesome snack that's naturally gluten-free.",
    categorySlug: "chips",
    images: [
      {
        url: "/images/hero/murukku-lifestyle.jpg",
        alt: "Real Foods banana chips (sample image — pending confirmation)",
      },
    ],
    variants: [
      {
        id: "var_banana_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 65,
        sku: "RF-CHP-BAN-200",
        stock: 60,
        inStock: true,
      },
    ],
    active: true,
    detailsPending: true,
    tags: ["gluten-free"],
  },
  {
    id: "prod_chips_potato",
    name: "Salted Potato Chips",
    slug: "salted-potato-chips",
    tagline: "Golden, crunchy, perfectly salted",
    description:
      "Classic salted potato chips — thin, golden and satisfyingly crunchy. The perfect everyday snack.",
    categorySlug: "chips",
    images: [
      {
        url: "/images/products/achappam/achappam-pack.jpg",
        alt: "Real Foods salted potato chips (sample image — pending confirmation)",
      },
    ],
    variants: [
      {
        id: "var_potato_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 50,
        sku: "RF-CHP-POT-200",
        stock: 0,
        inStock: false,
      },
    ],
    active: true,
    detailsPending: true,
    tags: ["classic"],
  },
  {
    id: "prod_namkeen_ratlami",
    name: "Ratlami Sev",
    slug: "ratlami-sev",
    tagline: "Crunchy, spicy, tangy lentil sev",
    description:
      "A bold, spiced lentil sev with authentic Ratlami-style heat and tang. Great on its own or as a topping.",
    categorySlug: "namkeen",
    images: [
      {
        url: "/images/products/murukku/murukku-pack.jpg",
        alt: "Real Foods Ratlami Sev (sample image — pending confirmation)",
      },
    ],
    variants: [
      {
        id: "var_ratlami_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 70,
        sku: "RF-NMK-RAT-200",
        stock: 40,
        inStock: true,
      },
    ],
    active: true,
    detailsPending: true,
    tags: ["spicy"],
  },
  {
    id: "prod_mixture",
    name: "Bombay Mixture",
    slug: "bombay-mixture",
    tagline: "Confetti of crunchy lentil & peanut treats",
    description:
      "A lively mix of crispy sev, roasted peanuts, lentils and curry leaves — tangy, crunchy and moreish.",
    categorySlug: "mixtures",
    images: [
      {
        url: "/images/hero/murukku-lifestyle.jpg",
        alt: "Real Foods Bombay Mixture (sample image — pending confirmation)",
      },
    ],
    variants: [
      {
        id: "var_mix_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 80,
        sku: "RF-MIX-BOM-200",
        stock: 55,
        inStock: true,
      },
    ],
    active: true,
    detailsPending: true,
    tags: ["spicy"],
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.active).slice(0, 4);
}

export function getProductsByCategory(
  categorySlug: Product["categorySlug"],
): Product[] {
  return products.filter(
    (p) => p.active && p.categorySlug === categorySlug,
  );
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug && p.active);
}

export function getRelatedProducts(product: Product): Product[] {
  return products
    .filter(
      (p) => p.active && p.id !== product.id && p.categorySlug === product.categorySlug,
    )
    .slice(0, 4);
}
