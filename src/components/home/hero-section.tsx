import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-stone-950">
      <div className="absolute inset-0">
        <ProductImage
          src="/images/hero/murukku-lifestyle.jpg"
          alt="Freshly made Real Foods murukku"
          priority
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
      </div>

      <div className="container-page relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            Real Foods
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Authentic taste.
            <br />
            Freshly made.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-stone-200 sm:text-lg">
            Hand-crafted murukku, achappam and traditional Indian snacks —
            made fresh, fried to golden perfection and packed with the taste
            of home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/products">
                Shop Now
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}