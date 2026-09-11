import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/");

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
          <div className="flex items-center gap-2">
            <p className="hidden text-sm text-stone-500 sm:block">Signed in as {user.name}</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft />
                View store
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-3" />

        <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
          <AdminNav />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}