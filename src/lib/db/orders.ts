import { prisma } from "@/lib/prisma";
import type { Order, OrderItem, OrderStatus } from "@/types/order";

const orderInclude = {
  items: true,
  address: true,
  user: { select: { email: true } },
  payments: true,
} as const;

type DbOrder = Awaited<ReturnType<typeof prisma.order.findFirst>> & {
  items: {
    id: string;
    orderId: string;
    variantId: string | null;
    productName: string;
    variantName: string;
    quantity: number;
    unitPrice: { toString: () => string };
    imageUrl: string | null;
  }[];
  address: {
    name?: string;
    phone?: string;
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    pincode: string;
  } | null;
  payments: {
    method: string;
    status: string;
  }[];
  user: { email: string } | null;
};

function mapOrder(row: DbOrder): Order {
  return {
    id: row.id,
    orderNumber: row.orderNumber,
    customerName: row.address?.name ?? "Guest",
    customerEmail: row.user?.email ?? "",
    items: row.items.map<OrderItem>((item) => ({
      productId: item.variantId ?? item.id,
      productName: item.productName,
      variantName: item.variantName,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      image: item.imageUrl ?? undefined,
    })),
    subtotal: Number(row.subtotal),
    deliveryCharge: Number(row.deliveryCharge),
    total: Number(row.total),
    status: row.status as OrderStatus,
    placedAt: row.placedAt.toISOString(),
    address: row.address
      ? {
          name: row.address.name ?? row.address.phone ?? "Guest",
          phone: row.address.phone ?? "",
          line1: row.address.line1,
          city: row.address.city,
          state: row.address.state,
          pincode: row.address.pincode,
        }
      : undefined,
  };
}

export async function listAllOrders(): Promise<Order[]> {
  const rows = await prisma.order.findMany({
    include: orderInclude as never,
    orderBy: { placedAt: "desc" },
  });
  return (rows as unknown as DbOrder[]).map(mapOrder);
}

export async function listMyOrders(userId: string): Promise<Order[]> {
  const rows = await prisma.order.findMany({
    where: { userId },
    include: orderInclude as never,
    orderBy: { placedAt: "desc" },
  });
  return (rows as unknown as DbOrder[]).map(mapOrder);
}

export async function getOrderByOrderNumber(
  orderNumber: string,
): Promise<Order | undefined> {
  const row = await prisma.order.findFirst({
    where: { orderNumber },
    include: orderInclude as never,
  });
  return row ? mapOrder(row as unknown as DbOrder) : undefined;
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const row = await prisma.order.findFirst({
    where: { id },
    include: orderInclude as never,
  });
  return row ? mapOrder(row as unknown as DbOrder) : undefined;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  outForDelivery: number;
  delivered: number;
  cancelled: number;
  recentOrders: Order[];
}

export async function getOrderStats(): Promise<OrderStats> {
  const [totalOrders, totalRevenue, pendingOrders, outForDelivery, delivered, cancelled, recent] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { status: "OUT_FOR_DELIVERY" } }),
      prisma.order.count({ where: { status: "DELIVERED" } }),
      prisma.order.count({ where: { status: "CANCELLED" } }),
      prisma.order.findMany({
        include: orderInclude as never,
        orderBy: { placedAt: "desc" },
        take: 5,
      }),
    ]);

  return {
    totalOrders,
    totalRevenue: Number(totalRevenue._sum.total ?? 0),
    pendingOrders,
    outForDelivery,
    delivered,
    cancelled,
    recentOrders: (recent as unknown as DbOrder[]).map(mapOrder),
  };
}

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  orderCount: number;
  totalSpent: number;
  joinedAt: string;
}

export async function listCustomers(): Promise<CustomerRow[]> {
  const users = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: {
      _count: { select: { orders: true } },
      orders: { select: { total: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    orderCount: user._count.orders,
    totalSpent: user.orders.reduce((sum, o) => sum + Number(o.total), 0),
    joinedAt: user.createdAt.toISOString(),
  }));
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await prisma.order.update({
    where: { id },
    data: { status },
  });
}