import type { MetadataRoute } from "next";

import { listCategories, listProducts } from "@/lib/db/products";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/track-order`, changeFrequency: "monthly", priority: 0.3 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];

  try {
    const [products, categories] = await Promise.all([
      listProducts(),
      listCategories(),
    ]);

    productRoutes = products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    categoryRoutes = categories.map((category) => ({
      url: `${SITE_URL}/products?category=${category.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // DB unavailable during build — publish the static routes at minimum.
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}