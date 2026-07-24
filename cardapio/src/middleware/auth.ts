import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { UserRole } from "@/types/user";

/**
 * Helpers de autenticação/autorização para Route Handlers e Server Components.
 */

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const status = (session.user as { status?: string }).status;
  if (status === "inactive") {
    throw new Error("INACTIVE_USER");
  }

  return session;
}

export async function requireRole(roles: UserRole[]) {
  const session = await requireAuth();
  const role = (session.user as { role?: UserRole }).role;

  if (!role || !roles.includes(role)) {
    throw new Error("FORBIDDEN");
  }

  return session;
}
