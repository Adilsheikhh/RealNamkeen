import type { Metadata } from "next";

import { BrandStorySection } from "@/components/home/brand-story-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { ProductImage } from "@/components/product/product-image";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Learn about Real Foods, Kannur — our story, our craft and how we make traditional Indian snacks.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-stone-900 py-16 sm:py-24">
        <div className="container-page max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            About Real Foods
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Snacks made the way they should be
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-300">
            We believe the snacks of our childhood deserve more respect. Real
            Foods was built to make traditional Indian treats the right way —
            fresh, honest and full of authentic flavour.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl">
            <ProductImage
              src="/images/products/murukku/murukku-pack.jpg"
              alt="Real Foods traditional murukku"
              fill={false}
              className="aspect-video w-full"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
              Our promise
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              Every snack we make starts with good ingredients and ends with a
              quality check. We fry in fresh oil, pack at peak freshness and
              never cut corners on taste. This is placeholder copy — the real
              business story, location and history are to be confirmed.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseUsSection />
      <BrandStorySection />
    </>
  );
}