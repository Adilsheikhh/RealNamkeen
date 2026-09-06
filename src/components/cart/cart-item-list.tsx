"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/cart-context";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function CartItemList() {
  const { lines, setQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
        <p className="font-display text-xl text-stone-700">Your cart is empty</p>
        <p className="mt-2 text-sm text-stone-500">
          Add something tasty to get started.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-stone-200">
      {lines.map((line) => (
        <li key={line.variantId} className="flex gap-4 py-5">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-stone-100">
            {line.image && (
              <Image src={line.image} alt={line.productName} fill sizes="96px" className="object-cover" />
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  href={`/products/${line.productId}`}
                  className="font-display font-semibold text-stone-900 hover:text-amber-800"
                >
                  {line.productName}
                </Link>
                <p className="mt-0.5 text-sm text-stone-500">
                  {line.variantName} · {line.weightGrams}g
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(line.variantId)}
                className="rounded-md p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                aria-label={`Remove ${line.productName}`}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <div className="mt-3 flex items-end justify-between gap-3">
              <QuantitySelector
                value={line.quantity}
                onChange={(q) => setQuantity(line.variantId, q)}
                max={Math.min(99, line.stock)}
              />
              <p className="text-sm font-semibold text-stone-900">
                {formatPrice(line.unitPrice * line.quantity)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}