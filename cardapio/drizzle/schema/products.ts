import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { subcategories } from "./subcategories";

export const products = sqliteTable("products", {
  id:             text("id").primaryKey(),
  name:           text("name").notNull(),
  description:    text("description"),
  subcategoryId:  text("subcategory_id").notNull().references(() => subcategories.id, { onDelete: "restrict" }),
  retailPrice:    real("retail_price").notNull(),
  wholesalePrice: real("wholesale_price").notNull(),
  imageUrl:       text("image_url"),
  status:         text("status").notNull().default("active"),
  displayOrder:   integer("display_order").notNull().default(0),
  createdAt:      integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt:      integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
