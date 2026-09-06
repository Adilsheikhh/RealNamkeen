import Link from "next/link";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductImage } from "@/components/product/product-image";
import { ProductPrice } from "@/components/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const image = product.images[0];
  const primaryVariant =
    product.variants.find((v) => v.inStock) ?? product.variants[0];
  const sizes = product.variants.map((v) => v.size).join(" · ");
  const soldOut = !product.variants.some((v) => v.inStock);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-none"
        aria-label={product.name}
      >
        <div className="relative aspect-video overflow-hidden bg-stone-100">
          {image && (
            <ProductImage
              src={image.url}
              alt={image.alt}
              priority={priority}
              className="transition-transform duration-300 group-hover:scale-[1.03]"
            />
          )}
          {product.detailsPending && (
            <Badge tone="stone" className="absolute left-3 top-3 bg-white/90">
              Sample Details*
            </Badge>
          )}
          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <Badge tone="red" className="text-sm">
                Sold out
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-700">
            {product.categorySlug}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-stone-900 group-hover:text-amber-800">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-stone-500">
            {product.tagline}
          </p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <ProductPrice
                price={primaryVariant?.price ?? 0}
                originalPrice={primaryVariant?.originalPrice}
                size="md"
              />
              <p className="mt-1 text-xs text-stone-400">{sizes}</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        {primaryVariant ? (
          <AddToCartButton
            productId={product.id}
            variantId={primaryVariant.id}
            disabled={soldOut}
            label={soldOut ? "Sold out" : "Add to Cart"}
            className="w-full"
          />
        ) : null}
      </div>
    </Card>
  );
}