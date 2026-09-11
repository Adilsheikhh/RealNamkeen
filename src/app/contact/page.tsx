import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Real Foods in Kannur, Kerala — call +91 9526395590 or email realfoodspnr@gmail.com for orders and enquiries.",
  alternates: { canonical: "/contact" },
};

const details = [
  {
    icon: MapPin,
    label: "Visit us",
    value: "Kannur, Kerala",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 95263 95590, +91 98469 06366",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "realfoodspnr@gmail.com",
  },
];

export default function ContactPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-3 text-stone-500">
          Questions about our products, bulk orders or wholesale? Send us a
          message and we&apos;ll get back to you.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <ContactForm />
        </div>

        <aside className="space-y-4">
          {details.map((d) => (
            <div
              key={d.label}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <d.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-3 font-semibold text-stone-900">{d.label}</h2>
              <p className="mt-1 text-sm text-stone-500">{d.value}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}