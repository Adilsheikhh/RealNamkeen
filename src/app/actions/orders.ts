"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@/types/order";

const DELIVERY_CHARGE = 40;
const FREE_DELIVERY_THRESHOLD = 399;

async function getActionUser() {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    return session?.user?.id ?? null;
  } catch {
    return null;
  }
}

const addressSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: z.string().min(6),
});

const itemSchema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
});

const orderSchema = z.object({
  items: z.array(itemSchema).min(1),
  address: addressSchema,
  note: z.string().optional(),
  paymentMethod: z.enum(["COD", "UPI", "CARD", "NET_BANKING"]).default("COD"),
});

function safeRevalidate(...paths: string[]) {
  try {
    for (const path of paths) revalidatePath(path);
  } catch {
    // No cache scope (e.g. invoked outside a request) — nothing to invalidate.
  }
}

function generateOrderNumber() {
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `RF-${random}`;
}

export type CreateOrderResult =
  | { ok: true; orderNumber: string }
  | { ok: false; error: string };

export async function createOrderAction(
  input: unknown,
): Promise<CreateOrderResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check your details and try again." };
  }

  const { items, address, note, paymentMethod } = parsed.data;
  const userId = await getActionUser();

  const variants = await prisma.productVariant.findMany({
    where: { id: { in: items.map((i) => i.variantId) } },
    include: {
      product: { include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } } },
    },
  });
  if (variants.length !== items.length) {
    return { ok: false, error: "One or more items in your cart are no longer available." };
  }

  let subtotal = 0;
  const orderItems = items.map((item) => {
    const variant = variants.find((v) => v.id === item.variantId)!;
    const unitPrice = Number(variant.price);
    subtotal += unitPrice * item.quantity;
    return {
      variantId: variant.id,
      productName: variant.product.name,
      variantName: variant.name,
      unitPrice,
      quantity: item.quantity,
      imageUrl: variant.product.images[0]?.url ?? null,
    };
  });

  const deliveryCharge =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryCharge;

  const now = new Date();

  const order = await prisma.$transaction(async (tx) => {
    const savedAddress = await tx.address.create({
      data: {
        userId,
        name: address.name,
        phone: address.phone,
        line1: address.line1,
        line2: address.line2 ?? null,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
    });

    const created = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        addressId: savedAddress.id,
        subtotal,
        deliveryCharge,
        tax: 0,
        total,
        status: "PENDING",
        note: note ?? null,
        placedAt: now,
        items: {
          create: orderItems.map((item) => ({
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            imageUrl: item.imageUrl,
          })),
        },
        payments: {
          create: {
            amount: total,
            method: paymentMethod,
            status: "PENDING",
          },
        },
      },
      select: { orderNumber: true },
    });

    return created;
  });

  safeRevalidate("/admin", "/account");

  return { ok: true, orderNumber: order.orderNumber };
}

export async function lookupOrderAction(
  orderNumber: string,
): Promise<unknown> {
  if (!orderNumber.trim()) return null;
  const order = await prisma.order.findFirst({
    where: { orderNumber: orderNumber.trim().toUpperCase() },
    include: { items: true, address: true },
  });
  if (!order) return null;

  return {
    orderNumber: order.orderNumber,
    status: order.status,
    placedAt: order.placedAt.toISOString(),
    items: order.items.map((item) => ({
      productName: item.productName,
      variantName: item.variantName,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
    })),
    total: Number(order.total),
  };
}

const updateStatusSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "READY",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ]),
});

export async function updateOrderStatusAction(
  input: unknown,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = updateStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid status update." };
  }

  const userId = await getActionUser();
  if (!userId) {
    return { ok: false, error: "Not authorized." };
  }
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (!user || user.role !== "ADMIN") {
    return { ok: false, error: "Not authorized." };
  }

  await prisma.order.update({
    where: { id: parsed.data.orderId },
    data: { status: parsed.data.status as OrderStatus },
  });

  safeRevalidate("/admin", "/account");

  return { ok: true };
}