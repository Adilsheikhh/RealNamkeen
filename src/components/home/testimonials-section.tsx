import { Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";

const sampleReviews = [
  {
    name: "Anjali V.",
    place: "Kochi",
    quote:
      "The murukku tastes exactly like the one from home. Crisp, fresh and not too oily. My family can't stop ordering it!",
  },
  {
    name: "Suresh K.",
    place: "Kottayam",
    quote:
      "Genuinely fresh snacks. You can taste the difference from the usual store-bought packs.",
  },
  {
    name: "Divya R.",
    place: "Thrissur",
    quote:
      "The achappam is light, crunchy and perfect for festivals. Already planning my next order.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="Reviews"
        title="Loved by our customers"
        description="Sample testimonials shown until real customer reviews are provided."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {sampleReviews.map((review) => (
          <figure
            key={review.name}
            className="relative rounded-2xl border border-stone-200 bg-white p-6"
          >
            <Quote className="size-6 text-amber-600/60" aria-hidden />
            <div className="mt-3 flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-stone-600">
              {review.quote}
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold text-stone-900">{review.name}</span>
              <span className="text-stone-400"> · {review.place}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}