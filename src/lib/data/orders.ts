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
        productId: "prod_palak_murukku",
        productName: "Palak Murukku",
        variantName: "200g Pouch",
        quantity: 2,
        unitPrice: 85,
        image: "/images/products/palak-murukku.jpg",
      },
    ],
    subtotal: 170,
    deliveryCharge: 40,
    total: 210,
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
        productName: "Achappam",
        variantName: "12 Piece Pack",
        quantity: 3,
        unitPrice: 75,
        image: "/images/products/achappam.jpg",
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
        productId: "prod_small_murukku",
        productName: "Small Murukku",
        variantName: "23 Piece Pack",
        quantity: 1,
        unitPrice: 47,
        image: "/images/products/small-murukku.jpg",
      },
      {
        productId: "prod_murukku",
        productName: "Murukku",
        variantName: "20 Piece Pack",
        quantity: 1,
        unitPrice: 70,
        image: "/images/products/murukku.jpg",
      },
    ],
    subtotal: 117,
    deliveryCharge: 40,
    total: 157,
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
        productId: "prod_big_murukku",
        productName: "Big Murukku",
        variantName: "23 Piece Pack",
        quantity: 1,
        unitPrice: 95,
        image: "/images/products/big-murukku.jpg",
      },
    ],
    subtotal: 95,
    deliveryCharge: 40,
    total: 135,
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
