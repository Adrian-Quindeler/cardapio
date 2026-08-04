"use client";

import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const session = authClient.useSession();

  return {
    session: session.data,
    isPending: session.isPending,
    error: session.error,
    refetch: session.refetch,
    login: authClient.signIn.username,
    logout: authClient.signOut,
  };
}
