import { relations } from "drizzle-orm";
import { user, session, account, verification, userRelations, sessionRelations, accountRelations } from "./auth";
import { categories } from "./categories";
import { subcategories } from "./subcategories";
import { products } from "./products";
import { storeHours } from "./store-hours";
import { storeSettings } from "./store-settings";

export const categoriesRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
}));

export const subcategoriesRelations = relations(subcategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.id],
  }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  subcategory: one(subcategories, {
    fields: [products.subcategoryId],
    references: [subcategories.id],
  }),
}));

export {
  user,
  session,
  account,
  verification,
  userRelations,
  sessionRelations,
  accountRelations,
  categories,
  subcategories,
  products,
  storeHours,
  storeSettings,
};
