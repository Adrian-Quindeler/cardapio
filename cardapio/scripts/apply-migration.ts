import { config } from "dotenv";
import { createClient } from "@libsql/client";

config({ path: ".env.local" });

async function applyMigration() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    console.log("Applying migration 0004_nappy_zarda...");
    
    // Verifica se a coluna já existe
    const result = await client.execute(
      `PRAGMA table_info(products)`
    );
    
    const hasColumn = (result.rows as any[]).some(
      (row: any) => row.name === "wholesale_quantity"
    );

    if (hasColumn) {
      console.log("✓ Column 'wholesale_quantity' already exists");
      return;
    }

    // Aplica a migração
    await client.execute(
      `ALTER TABLE products ADD COLUMN wholesale_quantity INTEGER DEFAULT 50 NOT NULL`
    );

    console.log("✓ Migration applied successfully");
  } catch (error) {
    console.error("✗ Error applying migration:", error);
    process.exit(1);
  }
}

applyMigration().catch(console.error);
