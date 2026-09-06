"use client";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export function CartSummary() {
  const { lines, subtotal, deliveryCharge, total, clearCart } = useCart();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-stone-500">Subtotal</span>
        <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-stone-500">Delivery</span>
        <span className="font-medium text-stone-900">
          {deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)}
        </span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-stone-900">Total</span>
        <span className="font-display text-2xl font-semibold text-stone-900">
          {formatPrice(total)}
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <Button size="lg" className="w-full">
          Proceed to Checkout
        </Button>
        <Button asChild variant="ghost" size="sm" className="w-full">
          <Link href="/products">Continue shopping</Link>
        </Button>
        {lines.length > 0 && (
          <Button variant="ghost" size="sm" className="w-full text-red-600 hover:bg-red-50" onClick={clearCart}>
            Clear cart
          </Button>
        )}
      </div>
      <p className="text-xs text-stone-400">
        Checkout, payments and delivery are placeholders in this build.
      </p>
    </div>
  );
}