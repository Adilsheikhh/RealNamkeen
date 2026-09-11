import type { Metadata } from "next";

import { OrderStatusControl } from "@/components/admin/order-status-control";
import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { listAllOrders } from "@/lib/db/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders",
  description: "Manage Real Foods customer orders.",
};

export default async function AdminOrdersPage() {
  const orders = await listAllOrders();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-stone-900">Orders</h2>
      <p className="mt-1 text-sm text-stone-500">
        Live orders from the database. Change a status to update fulfilment.
      </p>

      {orders.length === 0 && (
        <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-sm text-stone-500">
          <p className="font-medium text-stone-700">No orders yet</p>
          <p className="mt-1">Orders placed on the store will appear here.</p>
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
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
                {orders.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-stone-50">
                    <td className="px-5 py-4 font-medium text-stone-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-stone-700">{order.customerName}</p>
                      {order.customerEmail && (
                        <p className="text-xs text-stone-400">{order.customerEmail}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-stone-600">
                      {new Date(order.placedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-stone-600">
                      {order.items.reduce((n, i) => n + i.quantity, 0)}
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-stone-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <OrderStatusBadge status={order.status} />
                        <OrderStatusControl orderId={order.id} status={order.status} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}