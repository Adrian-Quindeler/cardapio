import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../../drizzle/schema";

console.log("TURSO URL:", process.env.TURSO_DATABASE_URL);
console.log("TURSO TOKEN:", !!process.env.TURSO_AUTH_TOKEN);

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
