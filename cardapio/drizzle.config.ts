import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js usa .env.local; o drizzle-kit não carrega esse arquivo sozinho.
config({ path: ".env.local" });

/**
 * Configuração do Drizzle Kit para Turso (SQLite).
 * Utiliza as variáveis de ambiente TURSO_DATABASE_URL e TURSO_AUTH_TOKEN.
 */
export default defineConfig({
  schema: "./drizzle/schema/index.ts",
  out: "./drizzle/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
