import type { Metadata } from "next";

import { CartItemList } from "@/components/cart/cart-item-list";
import { CartSummary } from "@/components/cart/cart-summary";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your Real Foods cart.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
        Your cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <CartItemList />
          </CardContent>
        </Card>

        <div className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}