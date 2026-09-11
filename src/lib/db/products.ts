import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Category, Product, ProductVariant } from "@/types/product";

const include = {
  category: { select: { slug: true } },
  images: { orderBy: { sortOrder: "asc" as const } },
  variants: true,
} satisfies Prisma.ProductInclude;

type ProductWithRelations = Prisma.ProductGetPayload<{ include: typeof include }>;

function mapVariant(variant: ProductWithRelations["variants"][number]): ProductVariant {
  return {
    id: variant.id,
    name: variant.name,
    size: variant.size,
    weightGrams: variant.weightGrams ?? undefined,
    price: Number(variant.price),
    originalPrice:
      variant.originalPrice != null ? Number(variant.originalPrice) : undefined,
    sku: variant.sku,
    stock: variant.stock,
    inStock: variant.inStock,
  };
}

function mapProduct(row: ProductWithRelations): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description,
    categorySlug: row.category.slug as Product["categorySlug"],
    images: row.images.map((image) => ({ url: image.url, alt: image.alt })),
    variants: row.variants.map(mapVariant),
    active: row.active,
    tags: row.tags ?? [],
  };
}

export async function listProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    include,
    orderBy: { name: "asc" },
  });
  return rows.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findFirst({
    where: { slug, active: true },
    include,
  });
  return row ? mapProduct(row) : undefined;
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true, category: { slug: categorySlug } },
    include,
    orderBy: { name: "asc" },
  });
  return rows.map(mapProduct);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: {
      active: true,
      category: { slug: product.categorySlug },
      NOT: { id: product.id },
    },
    include,
    take: limit,
  });
  return rows.map(mapProduct);
}

const FEATURED_SLUGS = ["murukku", "palak-murukku", "achappam", "chakli-chips"];

export async function getFeaturedProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { slug: { in: FEATURED_SLUGS }, active: true },
    include,
  });
  const ordered = FEATURED_SLUGS.flatMap((slug) =>
    rows.filter((row) => row.slug === slug),
  );
  return ordered.map(mapProduct);
}

export async function listCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });
  return rows.map((row) => ({
    slug: row.slug as Category["slug"],
    name: row.name,
    description: row.description ?? "",
    image: row.image ?? "",
  }));
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const row = await prisma.category.findFirst({
    where: { slug, active: true },
  });
  if (!row) return undefined;
  return {
    slug: row.slug as Category["slug"],
    name: row.name,
    description: row.description ?? "",
    image: row.image ?? "",
  };
}