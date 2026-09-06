import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="bg-stone-100/70">
      <div className="container-page py-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
              Admin
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
              Business dashboard
            </h1>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <ArrowLeft />
              View store
            </Link>
          </Button>
        </div>

        <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
          This dashboard currently shows sample data. Admin authentication and
          live database access will be added in a later stage.
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
          <AdminNav />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}