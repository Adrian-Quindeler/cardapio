import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const storeSettings = sqliteTable("store_settings", {
  id: text("id").primaryKey(),
  brandName: text("brand_name").notNull(),
  logoUrl:   text("logo_url"),
  logoPublicId: text("logo_public_id"),
  heroImageUrl: text("hero_image_url"),
  heroPublicId: text("hero_public_id"),
  heroAlt:   text("hero_alt"),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
