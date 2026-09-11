import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth/session";
import { listMyOrders } from "@/lib/db/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Account",
  description: "Your Real Foods account.",
};

export default async function AccountHomePage() {
  const user = await getCurrentUser();
  const orders = user ? await listMyOrders(user.id) : [];
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <p className="text-sm text-stone-500">Welcome back</p>
            <p className="font-display text-xl font-semibold text-stone-900">
              {user?.name ?? "Hi there"}
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/account/orders">
              View all orders
              <ArrowRight />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {recentOrders.length === 0 && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-500">
          <p className="font-medium text-stone-700">No orders yet</p>
          <p className="mt-1">
            Your recent orders will show up here after you check out.
          </p>
        </div>
      )}

      {recentOrders.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold text-stone-900">
            Recent orders
          </h2>
          <ul className="mt-4 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/account/orders/${order.orderNumber}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-stone-50"
                >
                  <div>
                    <p className="font-medium text-stone-900">{order.orderNumber}</p>
                    <p className="text-sm text-stone-500">
                      {new Date(order.placedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <span className="font-semibold text-stone-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}