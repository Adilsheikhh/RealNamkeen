import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { mockOrders } from "@/lib/data/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My orders",
  description: "View your Real Foods order history.",
};

export default function AccountOrdersPage() {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-stone-900">Orders</h2>
      <p className="mt-1 text-sm text-stone-500">
        Sample order history until checkout and storage are implemented.
      </p>

      <ul className="mt-4 space-y-4">
        {mockOrders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/account/orders/${order.id}`}
              className="block rounded-2xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-stone-900">{order.orderNumber}</p>
                  <p className="text-sm text-stone-500">
                    Placed on{" "}
                    {new Date(order.placedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item) => (
                    <span
                      key={item.productId}
                      className="relative size-10 overflow-hidden rounded-full border-2 border-white bg-stone-100"
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      )}
                    </span>
                  ))}
                  <span className="self-center pl-2 text-sm text-stone-500">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-stone-900">
                    {formatPrice(order.total)}
                  </span>
                  <span className="text-sm font-medium text-amber-700">View →</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}