import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/auth/session";
import { getOrderByOrderNumber } from "@/lib/db/orders";
import { formatPrice } from "@/lib/utils";

interface AccountOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Order details",
};

export default async function AccountOrderDetailPage({
  params,
}: AccountOrderDetailPageProps) {
  const { id } = await params;
  const user = await getCurrentUser();
  const order = await getOrderByOrderNumber(id.toUpperCase());

  if (!order || order.customerEmail !== user?.email) {
    notFound();
  }

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link href="/account/orders">
          <ChevronLeft />
          Back to orders
        </Link>
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-stone-900">
          {order.orderNumber}
        </h2>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="mt-1 text-sm text-stone-500">
        Placed on{" "}
        {new Date(order.placedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      <Card className="mt-6">
        <CardContent className="p-6">
          <ul className="space-y-4">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center gap-4">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-stone-900">{item.productName}</p>
                  <p className="text-sm text-stone-500">
                    {item.variantName} · ₹{item.unitPrice} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium text-stone-900">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <Separator className="my-6" />

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-stone-600">
              <dt>Subtotal</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-stone-600">
              <dt>Delivery</dt>
              <dd>{formatPrice(order.deliveryCharge)}</dd>
            </div>
            <div className="flex justify-between pt-2 text-base font-semibold text-stone-900">
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
          </dl>

          {order.address && (
            <div className="mt-6 rounded-xl bg-stone-50 p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-900">Delivery address</p>
              <p className="mt-1">
                {order.address.name}, {order.address.phone}
              </p>
              <p>{order.address.line1}</p>
              {order.address.line2 && <p>{order.address.line2}</p>}
              <p>
                {order.address.city}, {order.address.state} — {order.address.pincode}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}