import Link from "next/link";
import { Construction } from "lucide-react";

interface AdminSectionPlaceholderProps {
  title: string;
  description: string;
  plannedFeatures: string[];
}

export function AdminSectionPlaceholder({
  title,
  description,
  plannedFeatures,
}: AdminSectionPlaceholderProps) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-stone-900">{title}</h2>
      <p className="mt-1 text-sm text-stone-500">{description}</p>

      <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-stone-100 text-stone-500">
          <Construction className="size-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-stone-900">
          Coming in a later stage
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-500">
          This section is part of the admin architecture but isn&apos;t
          implemented yet. Planned features:
        </p>
        <ul className="mt-4 space-y-2 text-sm text-stone-600">
          {plannedFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-amber-600" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href="/admin"
          className="mt-6 inline-flex text-sm font-medium text-amber-700 hover:underline"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}