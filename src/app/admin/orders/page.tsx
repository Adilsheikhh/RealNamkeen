import type { Metadata } from "next";
import Link from "next/link";

import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { mockOrders } from "@/lib/data/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders",
  description: "Manage Real Foods customer orders.",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-stone-900">Orders</h2>
      <p className="mt-1 text-sm text-stone-500">
        Sample orders — accept/reject and status updates come in a later stage.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="bg-stone-50 text-stone-500">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Placed</th>
                <th className="px-5 py-3 font-medium">Items</th>
                <th className="px-5 py-3 text-right font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {mockOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-stone-50">
                  <td className="px-5 py-4">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="font-medium text-amber-700 hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-stone-700">{order.customerName}</td>
                  <td className="px-5 py-4 text-stone-600">
                    {new Date(order.placedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>
                  <td className="px-5 py-4 text-stone-600">
                    {order.items.reduce((n, i) => n + i.quantity, 0)}
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-stone-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}