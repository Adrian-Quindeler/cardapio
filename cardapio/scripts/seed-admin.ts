/**
 * Seed one-shot do primeiro usuário admin.
 *
 * Uso:
 *   npm run db:seed-admin
 *
 * Variáveis opcionais no .env.local:
 *   SEED_ADMIN_USERNAME (default: admin)
 *   SEED_ADMIN_PASSWORD (default: admin1234)
 *   SEED_ADMIN_EMAIL    (default: admin@localhost)
 *   SEED_ADMIN_NAME     (default: Administrador)
 */
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { account, user } from "../drizzle/schema/auth";

config({ path: ".env.local" });

async function seedAdmin() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL não definida em .env.local");
  }

  const turso = createClient({ url, authToken });
  const db = drizzle(turso);

  const username = (process.env.SEED_ADMIN_USERNAME ?? "admin").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? "admin1234";
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@localhost";
  const name = process.env.SEED_ADMIN_NAME ?? "Administrador";

  const existing = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.username, username))
    .limit(1);

  if (existing.length > 0) {
    console.log(`Usuário "${username}" já existe — seed ignorado.`);
    process.exit(0);
  }

  const id = crypto.randomUUID();
  const now = new Date();
  const hashed = await hashPassword(password);

  await db.insert(user).values({
    id,
    name,
    email,
    emailVerified: true,
    username,
    displayUsername: username,
    role: "admin",
    status: "active",
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(account).values({
    id: crypto.randomUUID(),
    accountId: id,
    providerId: "credential",
    userId: id,
    password: hashed,
    createdAt: now,
    updatedAt: now,
  });

  console.log("Admin criado com sucesso.");
  console.log(`  name:     ${name}`);
  console.log(`  username: ${username}`);
  console.log(`  email:    ${email}`);
  console.log("  password: (SEED_ADMIN_PASSWORD ou default admin1234)");
  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("Falha no seed:", error);
  process.exit(1);
});
