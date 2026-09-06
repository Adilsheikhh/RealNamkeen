"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";

import { OrderStatusBadge } from "@/components/order/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMockOrderById } from "@/lib/data/orders";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types/order";

export function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [result, setResult] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = orderNumber.trim();
    const order = getMockOrderById(q);
    setNotFound(!order);
    setResult(order ?? null);
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        role="search"
      >
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="order-number">Order number or ID</Label>
          <Input
            id="order-number"
            value={orderNumber}
            onChange={(e) => {
              setOrderNumber(e.target.value);
              setNotFound(false);
            }}
            placeholder="e.g. RF-1001 or ord_1"
          />
        </div>
        <Button type="submit">Track</Button>
      </form>

      {notFound && (
        <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50 px-6 py-10 text-center">
          <p className="font-medium text-amber-900">Order not found</p>
          <p className="mt-1 text-sm text-amber-700">
            Check the order number and try again. Tracking is mock data in this
            build.
          </p>
        </div>
      )}

      {result && (
        <Card>
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-stone-500">Order number</p>
                <p className="font-display text-xl font-semibold text-stone-900">
                  {result.orderNumber}
                </p>
              </div>
              <OrderStatusBadge status={result.status} />
            </div>

            <p className="mt-2 text-sm text-stone-500">
              Placed on{" "}
              {new Date(result.placedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            <div className="mt-6 space-y-2 border-t border-stone-200 pt-6 text-sm">
              {result.items.map((item) => (
                <div key={item.productId} className="flex justify-between gap-4 text-stone-600">
                  <span>
                    {item.productName}{" "}
                    <span className="text-stone-400">({item.variantName})</span> ×{" "}
                    {item.quantity}
                  </span>
                  <span className="font-medium text-stone-900">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between border-t border-stone-200 pt-2 font-semibold text-stone-900">
                <span>Total</span>
                <span>{formatPrice(result.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="rounded-2xl bg-stone-100 p-6 text-sm text-stone-500">
        <p className="flex items-center gap-2 font-medium text-stone-700">
          <PackageSearch className="size-5" />
          About tracking
        </p>
        <p className="mt-2">
          Tracking currently shows sample order data. Live order status will be
          available once orders and status updates are implemented.
        </p>
      </div>
    </div>
  );
}