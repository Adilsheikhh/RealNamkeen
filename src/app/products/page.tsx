import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/site";
import { CategoryFilter } from "@/components/product/category-filter";
import { ProductGrid } from "@/components/product/product-grid";
import { SearchBar } from "@/components/product/search-bar";
import { getCategory, listProducts } from "@/lib/db/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Real Foods — traditional murukku, achappam, chips and namkeen, freshly made in Kannur, Kerala.",
  alternates: { canonical: "/products" },
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: categorySlug, q } = await searchParams;

  const activeCategory = categorySlug != null ? await getCategory(categorySlug) : undefined;
  const query = q?.trim().toLowerCase() ?? "";

  const allProducts = await listProducts();
  let filtered = allProducts;

  if (activeCategory) {
    filtered = filtered.filter((p) => p.categorySlug === activeCategory.slug);
  }

  if (query) {
    filtered = filtered.filter((p) =>
      [p.name, p.tagline, p.description, p.categorySlug, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: activeCategory ? `${activeCategory.name} — Real Foods` : "All Products — Real Foods",
    url: `${SITE_URL}/products`,
    numberOfItems: filtered.length,
    itemListElement: filtered.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${SITE_URL}/products/${product.slug}`,
      image: product.images[0]?.url
        ? `${SITE_URL}${product.images[0].url}`
        : undefined,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: activeCategory?.name ?? "Products",
        item: `${SITE_URL}/products`,
      },
    ],
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
          Our products
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
          {activeCategory ? activeCategory.name : "All products"}
        </h1>
        <p className="mt-3 text-stone-500">
          {activeCategory
            ? activeCategory.description
            : "Freshly made namkeen, chips and traditional snacks."}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter active={categorySlug} />
        <SearchBar defaultValue={q ?? ""} className="sm:w-72" />
      </div>

      <div className="mt-8">
        <ProductGrid
          products={filtered}
          emptyMessage={
            query
              ? `No products match your search for "${q}".`
              : "No products in this category yet."
          }
        />
      </div>
    </div>
  );
}