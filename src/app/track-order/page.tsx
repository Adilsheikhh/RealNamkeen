import type { Metadata } from "next";

import { TrackOrderForm } from "@/components/order/track-order-form";

export const metadata: Metadata = {
  title: "Track your order",
  description: "Track your Real Foods order status.",
};

export default function TrackOrderPage() {
  return (
    <div className="container-page max-w-2xl py-10 sm:py-16">
      <h1 className="font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
        Track your order
      </h1>
      <p className="mt-3 text-stone-500">
        Enter your order number to see the current status.
      </p>

      <div className="mt-8">
        <TrackOrderForm />
      </div>
    </div>
  );
}