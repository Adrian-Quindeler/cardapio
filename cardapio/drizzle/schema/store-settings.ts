import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const storeSettings = sqliteTable("store_settings", {
  id: text("id").primaryKey(),
  brandName: text("brand_name").notNull(),
  logoUrl:   text("logo_url"),
  heroImageUrl: text("hero_image_url"),
  heroAlt:   text("hero_alt"),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
