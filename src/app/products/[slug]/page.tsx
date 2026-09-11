import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ProductDetails } from "@/components/product/product-details";
import { ProductImage } from "@/components/product/product-image";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/home/section-heading";
import { Badge } from "@/components/ui/badge";
import { SITE_URL } from "@/lib/site";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/db/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found", robots: { index: false } };
  }

  const price = product.variants[0]?.price;

  return {
    title: product.name,
    description: `${product.tagline} ₹${price} — buy ${product.name} online. Made fresh by Real Foods, Kannur, Kerala.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      type: "website",
      locale: "en_IN",
      url: `${SITE_URL}/products/${product.slug}`,
      images: product.images.map((img) => ({
        url: `${SITE_URL}${img.url}`,
        width: 1000,
        height: 1000,
        alt: img.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.tagline,
      images: product.images.map((img) => `${SITE_URL}${img.url}`),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const image = product.images[0];
  const variant = product.variants[0];
  const related = await getRelatedProducts(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/products/${product.slug}#product`,
    name: product.name,
    description: product.tagline,
    image: product.images.map((img) => `${SITE_URL}${img.url}`),
    sku: variant?.sku,
    category: product.categorySlug,
    brand: {
      "@type": "Brand",
      name: "Real Foods",
    },
    offers: variant
      ? {
          "@type": "Offer",
          url: `${SITE_URL}/products/${product.slug}`,
          priceCurrency: "INR",
          price: variant.price,
          itemCondition: "https://schema.org/NewCondition",
          availability: variant.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "Real Foods",
          },
        }
      : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${SITE_URL}/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
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