import type { Category, Product } from "@/types/product";

/**
 * Product data layer.
 *
 * Backed by in-memory data for now, returning the same shapes the
 * Prisma-backed implementation will provide, so the UI does not change
 * when the data source is swapped.
 *
 * Products, names, sizes and prices are the current business catalogue
 * (18 products). Descriptions are brief storefront copy and stock levels
 * are placeholders pending confirmation.
 */

export const categories: Category[] = [
  {
    slug: "murukku",
    name: "Murukku",
    description:
      "Classic crisp, spiral-shaped savoury snacks made the traditional way.",
    image: "/images/products/murukku.jpg",
  },
  {
    slug: "achappam",
    name: "Achappam",
    description:
      "Light, crunchy traditional rose cookies with a delicate sweetness.",
    image: "/images/products/achappam.jpg",
  },
  {
    slug: "chips",
    name: "Chips",
    description: "Crispy, golden fried chips and crisps.",
    image: "/images/products/chakli-chips.jpg",
  },
  {
    slug: "namkeen",
    name: "Namkeen & Papad",
    description: "Classic spiced Indian savoury snacks and papads.",
    image: "/images/products/papad-masala.jpg",
  },
];

export const products: Product[] = [
  {
    id: "prod_palak_murukku",
    name: "Palak Murukku",
    slug: "palak-murukku",
    tagline: "Crisp, lightly spiced palak murukku",
    description:
      "A crisp, golden-brown palak murukku made the traditional way — light, crunchy and lightly spiced for everyday snacking.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/palak-murukku.jpg",
        alt: "Real Foods Palak Murukku",
      },
    ],
    variants: [
      {
        id: "var_palak_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-PLK-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["bestseller", "murukku"],
  },
  {
    id: "prod_rice_murukku",
    name: "Rice Murukku",
    slug: "rice-murukku",
    tagline: "Classic rice murukku, crisp and crunchy",
    description:
      "Freshly made rice murukku — light, crisp spirals with the authentic taste of home-style snacking.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/rice-murukku.jpg",
        alt: "Real Foods Rice Murukku",
      },
    ],
    variants: [
      {
        id: "var_rice_250",
        name: "250g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-RCE-250",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["classic", "murukku"],
  },
  {
    id: "prod_garlic_murukku",
    name: "Garlic Murukku",
    slug: "garlic-murukku",
    tagline: "Crisp murukku with a punch of garlic",
    description:
      "Golden, crispy murukku with the bold, savoury flavour of garlic — a perfect tea-time snack.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/garlic-murukku.jpg",
        alt: "Real Foods Garlic Murukku",
      },
    ],
    variants: [
      {
        id: "var_garlic_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-GRC-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["garlic", "murukku"],
  },
  {
    id: "prod_small_murukku",
    name: "Small Murukku",
    slug: "small-murukku",
    tagline: "Bite-sized classic murukku",
    description:
      "Tiny, crispy murukku pieces that melt in the mouth — great for snacking straight from the box.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/small-murukku.jpg",
        alt: "Real Foods Small Murukku",
      },
    ],
    variants: [
      {
        id: "var_small_23n",
        name: "23 Piece Pack",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-SML-23N",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["murukku", "bite-size"],
  },
  {
    id: "prod_chakli_chips",
    name: "Chakli Chips",
    slug: "chakli-chips",
    tagline: "Crunchy, twisted chakli chips",
    description:
      "Twisted, spiral chakli chips fried to a satisfying crunch — a classic festive snack in a shareable pack.",
    categorySlug: "chips",
    images: [
      {
        url: "/images/products/chakli-chips.jpg",
        alt: "Real Foods Chakli Chips",
      },
    ],
    variants: [
      {
        id: "var_chakli_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-CHP-CHK-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["chakli", "festive"],
  },
  {
    id: "prod_ragi_murukku",
    name: "Ragi Murukku",
    slug: "ragi-murukku",
    tagline: "Wholesome ragi murukku",
    description:
      "Crisp murukku made with ragi (finger millet) — a wholesome twist on the classic, perfect with chai.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/ragi-murukku.jpg",
        alt: "Real Foods Ragi Murukku",
      },
    ],
    variants: [
      {
        id: "var_ragi_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-RGI-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["ragi", "wholesome"],
  },
  {
    id: "prod_butter_murukku",
    name: "Butter Murukku",
    slug: "butter-murukku",
    tagline: "Rich, buttery & crisp",
    description:
      "Smooth, melt-in-your-mouth murukku with a delicate buttery richness — a soft and tender spiral snack.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/butter-murukku.jpg",
        alt: "Real Foods Butter Murukku",
      },
    ],
    variants: [
      {
        id: "var_butter_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-BTR-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["butter", "murukku"],
  },
  {
    id: "prod_tomato_papad_vada",
    name: "Papad Vada (Tomato)",
    slug: "papad-vada-tomato",
    tagline: "Tangy tomato-flavoured papad vada",
    description:
      "Light, puffed papad vada with a tangy tomato flavour — a crowd-pleasing snack for every occasion.",
    categorySlug: "namkeen",
    images: [
      {
        url: "/images/products/tomato-papad-vada.jpg",
        alt: "Real Foods Tomato Papad Vada",
      },
    ],
    variants: [
      {
        id: "var_tpv_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-NMK-TPV-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["tomato", "papad", "vegan"],
  },
  {
    id: "prod_masala_murukku",
    name: "Masala Murukku",
    slug: "masala-murukku",
    tagline: "Spiced masala murukku",
    description:
      "Murukku seasoned with a lively masala spice mix — crunchy, flavourful and hard to stop eating.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/masala-murukku.jpg",
        alt: "Real Foods Masala Murukku",
      },
    ],
    variants: [
      {
        id: "var_masala_250",
        name: "250g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-MSL-250",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["masala", "spicy"],
  },
  {
    id: "prod_ring_murukku",
    name: "Ring Murukku",
    slug: "ring-murukku",
    tagline: "Classic ring-shaped murukku",
    description:
      "Beautiful ring-shaped murukku, crisp and golden — a traditional favourite for festive spreads.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/ring-murukku.jpg",
        alt: "Real Foods Ring Murukku",
      },
    ],
    variants: [
      {
        id: "var_ring_250",
        name: "250g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-RNG-250",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["classic", "murukku"],
  },
  {
    id: "prod_murukku",
    name: "Murukku",
    slug: "murukku",
    tagline: "The classic spiral murukku",
    description:
      "Our signature spiral murukku — golden, crisp and made to a traditional home recipe.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/murukku.jpg",
        alt: "Real Foods Murukku",
      },
    ],
    variants: [
      {
        id: "var_murukku_20n",
        name: "20 Piece Pack",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-MRK-20N",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["bestseller", "classic"],
  },
  {
    id: "prod_big_murukku",
    name: "Big Murukku",
    slug: "big-murukku",
    tagline: "Large, satisfying classic murukku",
    description:
      "Extra-large spiral murukku with a hearty crunch — the showstopper of the murukku family.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/big-murukku.jpg",
        alt: "Real Foods Big Murukku",
      },
    ],
    variants: [
      {
        id: "var_big_23n",
        name: "23 Piece Pack",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-BIG-23N",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["family-pack", "murukku"],
  },
  {
    id: "prod_tomato_murukku",
    name: "Tomato Murukku",
    slug: "tomato-murukku",
    tagline: "Tangy tomato-tinged murukku",
    description:
      "Crisp murukku with a gentle tangy twist of tomato — bright, savoury and moreish.",
    categorySlug: "murukku",
    images: [
      {
        url: "/images/products/tomato-murukku.jpg",
        alt: "Real Foods Tomato Murukku",
      },
    ],
    variants: [
      {
        id: "var_tomato_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-MUR-TMT-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["tomato", "tangy"],
  },
  {
    id: "prod_polo",
    name: "Polo",
    slug: "polo",
    tagline: "Light, crispy polo snack",
    description:
      "A light, crispy traditional polo snack — golden, delicate and perfect for tea-time.",
    categorySlug: "chips",
    images: [
      {
        url: "/images/products/polo.jpg",
        alt: "Real Foods Polo",
      },
    ],
    variants: [
      {
        id: "var_polo_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-CHP-POL-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["crispy", "classic"],
  },
  {
    id: "prod_papad_vada",
    name: "Papad Vada",
    slug: "papad-vada",
    tagline: "Light, puffed and crispy",
    description:
      "Fluffy, puffed papad vada that snaps lightly when you bite — a simple, satisfying snack.",
    categorySlug: "namkeen",
    images: [
      {
        url: "/images/products/papad-vada.jpg",
        alt: "Real Foods Papad Vada",
      },
    ],
    variants: [
      {
        id: "var_pv_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-NMK-PV-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["papad", "vegan"],
  },
  {
    id: "prod_papad_masala",
    name: "Papad Masala",
    slug: "papad-masala",
    tagline: "Spiced, crunchy papad",
    description:
      "Crispy papad generously seasoned with a savoury masala — a crunchy companion to any meal.",
    categorySlug: "namkeen",
    images: [
      {
        url: "/images/products/papad-masala.jpg",
        alt: "Real Foods Papad Masala",
      },
    ],
    variants: [
      {
        id: "var_pm_200",
        name: "200g Pouch",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-NMK-PM-200",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["masala", "spicy"],
  },
  {
    id: "prod_achappam",
    name: "Achappam",
    slug: "achappam",
    tagline: "Delicate, crunchy rose cookies",
    description:
      "Delicate, floral achappam — light, crispy and gently sweet, a festive special turned everyday classic.",
    categorySlug: "achappam",
    images: [
      {
        url: "/images/products/achappam.jpg",
        alt: "Real Foods Achappam",
      },
    ],
    variants: [
      {
        id: "var_achappam_12n",
        name: "12 Piece Pack",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-ACH-ACH-12N",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["festive", "sweet", "classic"],
  },
  {
    id: "prod_small_achappam",
    name: "Small Achappam",
    slug: "small-achappam",
    tagline: "Bite-size rose cookies",
    description:
      "Small, delicate achappam — crispy and gently sweet, perfect for sharing during the festive season.",
    categorySlug: "achappam",
    images: [
      {
        url: "/images/products/small-achappam.jpg",
        alt: "Real Foods Small Achappam",
      },
    ],
    variants: [
      {
        id: "var_small_achappam_27n",
        name: "27 Piece Pack",
        size: "200g",
        weightGrams: 200,
        price: 225,
        sku: "RF-ACH-SML-27N",
        stock: 100,
        inStock: true,
      },
    ],
    active: true,
    tags: ["festive", "sweet"],
  },
];

export function getFeaturedProducts(): Product[] {
  const featuredIds = [
    "prod_murukku",
    "prod_palak_murukku",
    "prod_achappam",
    "prod_chakli_chips",
  ];
  const byId = new Map(products.map((p) => [p.id, p]));
  return featuredIds
    .map((id) => byId.get(id))
    .filter((p): p is Product => Boolean(p && p.active));
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
      (p) =>
        p.active && p.id !== product.id && p.categorySlug === product.categorySlug,
    )
    .slice(0, 4);
}