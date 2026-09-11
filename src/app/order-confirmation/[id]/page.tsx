import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Package } from "lucide-react";

import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrderByOrderNumber } from "@/lib/db/orders";
import { formatPrice } from "@/lib/utils";

interface OrderConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Order confirmation",
  description: "Thanks for your order with Real Foods.",
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { id } = await params;
  const order = await getOrderByOrderNumber(id.toUpperCase());

  return (
    <div className="container-page max-w-3xl py-10 sm:py-16">
      <div className="text-center">
        <CheckCircle2 className="mx-auto size-14 text-green-600" aria-hidden />
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl">
          Thank you for your order!
        </h1>
        <p className="mt-3 text-stone-500">
          {order
            ? `Order ${order.orderNumber} has been received and will be confirmed shortly.`
            : "Your order has been received. We'll confirm details shortly."}
        </p>
      </div>

      {order && (
        <Card className="mt-10">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-stone-500">Order number</p>
                <p className="font-display text-xl font-semibold text-stone-900">
                  {order.orderNumber}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            <Separator className="my-6" />

            <ul className="space-y-4">
              {order.items.map((item) => (
                <li key={item.productId} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
                      <Package className="size-5" />
                    </span>
                    <div>
                      <p className="font-medium text-stone-900">{item.productName}</p>
                      <p className="text-sm text-stone-500">
                        {item.variantName} × {item.quantity}
                      </p>
                    </div>
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
                <p className="font-medium text-stone-900">Delivering to</p>
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
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/products">Continue shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/track-order">Track order</Link>
        </Button>
      </div>
    </div>
  );
}