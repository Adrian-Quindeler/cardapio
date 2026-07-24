import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Catch-all do Better Auth: login, logout, sessão, etc. em /api/auth/*.
 */
export const { GET, POST } = toNextJsHandler(auth);
