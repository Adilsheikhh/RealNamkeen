/**
 * User roles mirror the Prisma `UserRole` enum so the type is available
 * on the client/server boundary without importing Prisma types.
 */
export const USER_ROLES = ["CUSTOMER", "ADMIN"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const ADMIN_ROUTE = "/admin" as const;
export const CUSTOMER_ROUTES = [
  "/account",
  "/account/orders",
  "/checkout",
] as const;