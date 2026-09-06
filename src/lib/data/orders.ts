import type { Order } from "@/types/order";

/**
 * Mock order data shown until the database/cart checkout is wired up.
 * Each shape matches what the Prisma-backed implementation will return.
 */

export const mockOrders: Order[] = [
  {
    id: "ord_1",
    orderNumber: "RF-1001",
    customerName: "Aditi Sharma",
    customerEmail: "aditi@example.com",
    items: [
      {
        productId: "prod_murukku",
        productName: "Traditional Murukku",
        variantName: "400g Family Pack",
        quantity: 2,
        unitPrice: 110,
        image: "/images/products/murukku/murukku-pack.jpg",
      },
    ],
    subtotal: 220,
    deliveryCharge: 40,
    total: 260,
    status: "CONFIRMED",
    placedAt: "2026-09-05T10:30:00Z",
    address: {
      name: "Aditi Sharma",
      phone: "9876500000",
      line1: "12 Rose Villa, MG Road",
      city: "Kochi",
      state: "Kerala",
      pincode: "682016",
    },
  },
  {
    id: "ord_2",
    orderNumber: "RF-1002",
    customerName: "Rahul Nair",
    customerEmail: "rahul@example.com",
    items: [
      {
        productId: "prod_achappam",
        productName: "Rose Achappam",
        variantName: "200g Pouch",
        quantity: 3,
        unitPrice: 75,
        image: "/images/products/achappam/achappam-pack.jpg",
      },
    ],
    subtotal: 225,
    deliveryCharge: 40,
    total: 265,
    status: "PREPARING",
    placedAt: "2026-09-05T12:15:00Z",
    address: {
      name: "Rahul Nair",
      phone: "9876500001",
      line1: "4 Canal Road, Edapally",
      city: "Kochi",
      state: "Kerala",
      pincode: "682024",
    },
  },
  {
    id: "ord_3",
    orderNumber: "RF-1003",
    customerName: "Meera Krishnan",
    customerEmail: "meera@example.com",
    items: [
      {
        productId: "prod_murukku",
        productName: "Traditional Murukku",
        variantName: "200g Pouch",
        quantity: 1,
        unitPrice: 60,
        image: "/images/products/murukku/murukku-pack.jpg",
      },
      {
        productId: "prod_achappam",
        productName: "Rose Achappam",
        variantName: "200g Pouch",
        quantity: 1,
        unitPrice: 75,
        image: "/images/products/achappam/achappam-pack.jpg",
      },
    ],
    subtotal: 135,
    deliveryCharge: 40,
    total: 175,
    status: "OUT_FOR_DELIVERY",
    placedAt: "2026-09-04T09:00:00Z",
    address: {
      name: "Meera Krishnan",
      phone: "9876500002",
      line1: "88 Palm Grove, Fort Kochi",
      city: "Kochi",
      state: "Kerala",
      pincode: "682001",
    },
  },
  {
    id: "ord_4",
    orderNumber: "RF-1004",
    customerName: "Arjun Menon",
    customerEmail: "arjun@example.com",
    items: [
      {
        productId: "prod_murukku",
        productName: "Traditional Murukku",
        variantName: "400g Family Pack",
        quantity: 1,
        unitPrice: 110,
        image: "/images/products/murukku/murukku-pack.jpg",
      },
    ],
    subtotal: 110,
    deliveryCharge: 40,
    total: 150,
    status: "DELIVERED",
    placedAt: "2026-09-02T11:00:00Z",
    address: {
      name: "Arjun Menon",
      phone: "9876500003",
      line1: "3 Lake View, Vyttila",
      city: "Kochi",
      state: "Kerala",
      pincode: "682019",
    },
  },
];

export function getMockOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id || o.orderNumber === id);
}
