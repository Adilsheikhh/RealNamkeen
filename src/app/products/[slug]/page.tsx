import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetails } from "@/components/product/product-details";
import { ProductImage } from "@/components/product/product-image";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/home/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/data/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.images.map((img) => ({ url: img.url })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const image = product.images[0];
  const related = getRelatedProducts(product);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-stone-100">
          {image && (
            <ProductImage
              src={image.url}
              alt={image.alt}
              priority
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          {product.detailsPending && (
            <Badge tone="stone" className="absolute left-4 top-4 bg-white/90">
              Sample image*
            </Badge>
          )}
        </div>

        <ProductDetails product={product} />
      </div>

      <div className="mt-16">
        <SectionHeading
          eyebrow="More from Real Foods"
          title="You may also like"
          align="left"
        />
        <div className="mt-8">
          <ProductGrid products={related} emptyMessage="More products coming soon." />
        </div>
      </div>
    </div>
  );
}