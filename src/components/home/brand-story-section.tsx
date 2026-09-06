import { ProductImage } from "@/components/product/product-image";
import { Badge } from "@/components/ui/badge";

export function BrandStorySection() {
  return (
    <section className="bg-stone-100/60 py-16 sm:py-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl">
          <ProductImage
            src="/images/hero/murukku-lifestyle.jpg"
            alt="Real Foods freshly made murukku"
            fill={false}
            className="aspect-video w-full"
          />
          <Badge tone="amber" className="absolute left-4 top-4">
            Freshly made, in-house
          </Badge>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
            Our story
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
            Made with tradition, crafted with care
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600">
            Real Foods began with a simple belief: Indian snacks deserve to be
            made properly. No shortcuts, no compromise — just authentic
            recipes, quality ingredients and the craftsmanship that has kept
            these treats special for generations.
          </p>
          <p className="mt-3 leading-relaxed text-stone-600">
            From the first batch of murukku to today, every snack is
            manufactured fresh, inspected for quality and packed with pride.
            This is a placeholder brand story to be updated with the actual
            business history.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-stone-600">
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-600" />
              Traditional recipes, modern manufacturing
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-600" />
              Fresh batches made regularly
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-600" />
              Quality checks at every step
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}