export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
  productId: string;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  image?: string;
}

export interface OrderAddress {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: OrderStatus;
  placedAt: string;
  address?: OrderAddress;
  note?: string;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  READY: "Ready",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const STATUS_TONE: Record<OrderStatus, "amber" | "blue" | "violet" | "cyan" | "indigo" | "green" | "red"> = {
  PENDING: "amber",
  CONFIRMED: "blue",
  PREPARING: "violet",
  READY: "cyan",
  OUT_FOR_DELIVERY: "indigo",
  DELIVERED: "green",
  CANCELLED: "red",
};
