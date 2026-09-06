import type { AuthUser, UserRole } from "@/types/auth";

/**
 * Server-side session/authorization helpers.
 *
 * NOT IMPLEMENTED YET. These are typed placeholders that document the
 * auth architecture (Auth.js/NextAuth backed, checked server-side).
 *
 * In a later stage `getCurrentUser()` will read the Auth.js session and
 * `requireRole()` will redirect unauthenticated/unauthorized users
 * before any admin or account page renders. Never gate admin access by
 * hiding UI alone.
 */

export async function getCurrentUser(): Promise<AuthUser | null> {
  // TODO: replace with Auth.js `auth()` session lookup.
  return null;
}

export async function requireRole(role: UserRole): Promise<AuthUser> {
  // TODO: redirect to /login when no session, / when role not allowed.
  const user = await getCurrentUser();
  if (!user || user.role !== role) {
    throw new Error("Unauthorized — auth is not implemented yet");
  }
  return user;
}