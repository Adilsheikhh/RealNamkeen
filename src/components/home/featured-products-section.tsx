import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/data/products";

export function FeaturedProductsSection() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-stone-100/60 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Bestsellers"
          title="Featured products"
          description="Our most-loved snacks, made fresh and packed with authentic flavour."
        />

        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              View all products
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}