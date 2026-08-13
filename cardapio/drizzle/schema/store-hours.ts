import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const storeHours = sqliteTable("store_hours", {
  id: text("id").primaryKey(),
  dayOfWeek: integer("day_of_week").notNull().unique(),
  openTime:  text("open_time"),
  closeTime: text("close_time"),
  isClosed:  integer("is_closed", { mode: "boolean" }).notNull().default(false),
});
