import type { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { mockOrders } from "@/lib/data/orders";

export const metadata: Metadata = {
  title: "Reports",
};

export default function AdminReportsPage() {
  const revenue = mockOrders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total, 0);
  const deliveredCount = mockOrders.filter(
    (o) => o.status === "DELIVERED",
  ).length;

  const rows = [
    { label: "Total sales (sample)", value: formatInr(revenue) },
    { label: "Orders in sample data", value: String(mockOrders.length) },
    { label: "Delivered orders", value: String(deliveredCount) },
    { label: "Average order value (sample)", value: formatInr(Math.round(revenue / Math.max(mockOrders.length, 1))) },
  ];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-stone-900">Reports</h2>
      <p className="mt-1 text-sm text-stone-500">
        Sales summary based on the current sample data.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <Card key={row.label}>
            <CardContent className="p-5">
              <p className="text-sm text-stone-500">{row.label}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-stone-900">
                {row.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-6 rounded-xl bg-stone-100 p-4 text-xs text-stone-500">
        Charts, date ranges and exports will be built after live order data is
        available.{" "}
        <Link href="/admin" className="font-medium text-amber-700 hover:underline">
          Back to dashboard
        </Link>
      </p>
    </div>
  );
}

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}