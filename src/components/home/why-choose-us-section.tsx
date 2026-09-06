import { Clock, Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";

const reasons = [
  {
    icon: Clock,
    title: "Freshly Manufactured",
    description:
      "Made in small batches and packed when they're at their best, so every pack tastes fresh.",
  },
  {
    icon: Leaf,
    title: "Quality Ingredients",
    description:
      "Carefully sourced rice flour, lentils, spices and oils that you can actually taste.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Production",
    description:
      "Production follows clean, hygienic practices at every step — from kitchen to pack.",
  },
  {
    icon: Sparkles,
    title: "Authentic Taste",
    description:
      "Time-honoured traditional recipes, made the way snacks are meant to be made.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="Why Real Foods"
        title="Snacks you can trust"
        description="Every pack is made with care — from choosing the ingredients to how it reaches your door."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <reason.icon className="size-6" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-stone-900">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}