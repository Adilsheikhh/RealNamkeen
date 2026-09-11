import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { AuthUser, UserRole } from "@/types/auth";

/**
 * Server-side session helpers backed by Auth.js.
 *
 * getCurrentUser() returns the signed-in user (with role) or null.
 * requireRole() returns the user if the role matches, otherwise redirects.
 */

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as AuthUser["role"],
  };
}

export async function requireRole(role: UserRole): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }
  if (user.role !== role) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}