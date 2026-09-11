import type { Metadata } from "next";

import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Real Foods order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
        Checkout
      </h1>
      <p className="mt-2 text-stone-500">
        Almost done — just confirm your delivery details.
      </p>

      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}