import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/lib/data/products";
import { ProductImage } from "@/components/product/product-image";

export function CategoriesSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
          Our range
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
          Shop by category
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className="group relative block overflow-hidden rounded-2xl bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            style={{ minHeight: "220px" }}
          >
            <ProductImage
              src={category.image}
              alt={category.name}
              fill
              className="transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 hidden text-sm text-stone-200 sm:block">
                    {category.description}
                  </p>
                </div>
                <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-amber-600">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}