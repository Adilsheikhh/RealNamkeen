"use client";

import { useState } from "react";
import { Check, Package } from "lucide-react";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductPrice } from "@/components/product/product-price";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    () => product.variants.find((v) => v.inStock)?.id ?? product.variants[0]?.id,
  );
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants.find((v) => v.id === selectedVariantId);
  const soldOut = !product.variants.some((v) => v.inStock);

  if (!variant) {
    return (
      <p className="text-sm text-stone-500">This product is currently unavailable.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-amber-700">
          {product.categorySlug}
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-2 text-lg text-stone-500">{product.tagline}</p>
      </div>

      <ProductPrice
        price={variant.price}
        originalPrice={variant.originalPrice}
        size="lg"
      />

      <Separator />

      <div>
        <h2 className="text-sm font-medium text-stone-900">Select size</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedVariantId(v.id)}
              aria-pressed={v.id === selectedVariantId}
              className={cn(
                "relative rounded-xl border px-4 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60",
                v.id === selectedVariantId
                  ? "border-amber-600 bg-amber-50"
                  : "border-stone-300 bg-white hover:border-stone-400",
              )}
            >
              <span className="block text-sm font-semibold text-stone-900">
                {v.name}
              </span>
              <span className="mt-0.5 flex items-center justify-between gap-3">
                <span className="text-xs text-stone-500">{v.size}</span>
                <span className="text-xs font-medium text-stone-700">
                  ₹{v.price}
                </span>
              </span>
              {!v.inStock && (
                <span className="mt-1 block text-[11px] font-medium text-red-600">
                  Sold out
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <AddToCartButton
          productId={product.id}
          variantId={variant.id}
          quantity={quantity}
          disabled={soldOut || !variant.inStock}
          label={variant.inStock ? "Add to Cart" : "Sold out"}
          className="sm:flex-1"
        />
      </div>

      <div className="flex flex-col gap-2 text-sm text-stone-500">
        <p className="flex items-center gap-2">
          <Package className="size-4 text-stone-400" />
          {variant.inStock ? "In stock, ready to dispatch" : "Currently out of stock"}
        </p>
        <p className="flex items-center gap-2">
          <Check className="size-4 text-stone-400" />
          SKU: <span className="font-medium text-stone-700">{variant.sku}</span>
        </p>
      </div>

      {product.detailsPending && (
        <Badge tone="stone" className="self-start">
          Product details are sample placeholders pending business confirmation.
        </Badge>
      )}
    </div>
  );
}