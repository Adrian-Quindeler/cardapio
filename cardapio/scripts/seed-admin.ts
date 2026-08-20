import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { hashPassword } from "better-auth/crypto";
import { drizzle } from "drizzle-orm/libsql";
import { randomUUID } from "node:crypto";
import * as schema from "../drizzle/schema/auth";

config({ path: ".env.local" });

const username = process.env.SEED_ADMIN_USERNAME ?? "admin";
const password = process.env.SEED_ADMIN_PASSWORD ?? "123456";
const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@localhost").toLowerCase();
const name = process.env.SEED_ADMIN_NAME ?? "Administrador";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error("TURSO_DATABASE_URL não definida (.env.local)");
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const db = drizzle(client, { schema });

  await db.delete(schema.session);
  await db.delete(schema.account);
  await db.delete(schema.verification);
  await db.delete(schema.user);

  const now = new Date();
  const userId = randomUUID();
  const hashed = await hashPassword(password);

  await db.insert(schema.user).values({
    id: userId,
    name,
    email,
    emailVerified: false,
    image: null,
    createdAt: now,
    updatedAt: now,
    username: username.toLowerCase(),
    displayUsername: username,
    role: "admin",
    status: "active",
  });

  await db.insert(schema.account).values({
    id: randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: hashed,
    createdAt: now,
    updatedAt: now,
  });

  console.log(`Admin criado: username="${username}" name="${name}"`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
