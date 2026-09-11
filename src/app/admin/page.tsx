import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  IndianRupee,
  ShoppingCart,
  Timer,
  Users,
} from "lucide-react";

import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getOrderStats } from "@/lib/db/orders";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Real Foods business management dashboard.",
};

export default async function AdminDashboardPage() {
  const [stats, customerCount] = await Promise.all([
    getOrderStats(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
  ]);

  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      hint: `${stats.pendingOrders} pending`,
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: Timer,
      hint: "needs attention",
    },
    {
      label: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      icon: IndianRupee,
      hint: `${stats.delivered} delivered`,
    },
    {
      label: "Customers",
      value: customerCount,
      icon: Users,
      hint: "registered accounts",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <stat.icon className="size-5" aria-hidden />
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-semibold text-stone-900">
                {stat.value}
              </p>
              <p className="text-sm text-stone-500">{stat.label}</p>
              <p className="mt-1 text-xs text-stone-400">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-6 pt-6">
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Recent orders
              </h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/orders">
                  View all
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="mt-4 w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-y border-stone-200 text-stone-500">
                    <th className="px-6 py-3 font-medium">Order</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-stone-50">
                      <td className="px-6 py-3 font-medium text-stone-900">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-3 text-stone-600">{order.customerName}</td>
                      <td className="px-6 py-3">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-3 text-right font-medium text-stone-900">
                        {formatPrice(order.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <h2 className="font-display text-lg font-semibold text-stone-900">
                Quick actions
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/admin/orders">Manage orders</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/admin/products">Manage products</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/admin/inventory">Inventory</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/admin/messages">Messages</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="font-display text-lg font-semibold text-stone-900">
                Order status flow
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="amber">Pending</Badge>
                <Badge tone="blue">Confirmed</Badge>
                <Badge tone="violet">Preparing</Badge>
                <Badge tone="cyan">Ready</Badge>
                <Badge tone="indigo">Out for delivery</Badge>
                <Badge tone="green">Delivered</Badge>
                <Badge tone="red">Cancelled</Badge>
              </div>
              <p className="mt-3 text-xs text-stone-400">
                Update order statuses from the Orders page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}