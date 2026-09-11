"use client";

import { useRouter } from "next/navigation";

import { updateOrderStatusAction } from "@/app/actions/orders";
import { ORDER_STATUSES, STATUS_LABELS, type OrderStatus } from "@/types/order";

export function OrderStatusControl({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await updateOrderStatusAction({
      orderId,
      status: e.target.value as OrderStatus,
    });
    router.refresh();
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      aria-label="Update order status"
      className="rounded-lg border border-stone-200 bg-white px-2 py-1 text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      {ORDER_STATUSES.map((option) => (
        <option key={option} value={option}>
          {STATUS_LABELS[option]}
        </option>
      ))}
    </select>
  );
}