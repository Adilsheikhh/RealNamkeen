import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS, STATUS_TONE, type OrderStatus } from "@/types/order";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge tone={STATUS_TONE[status]}>{STATUS_LABELS[status]}</Badge>;
}