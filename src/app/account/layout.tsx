import Link from "next/link";
import { LayoutDashboard, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const accountLinks = [
  { href: "/account", label: "Account", icon: LayoutDashboard },
  { href: "/account/orders", label: "Orders", icon: Package },
];

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
        My account
      </h1>
      <p className="mt-2 text-stone-500">
        This account section is sample data until authentication is implemented.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Account" className="flex gap-2 lg:flex-col">
          {accountLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100",
              )}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}