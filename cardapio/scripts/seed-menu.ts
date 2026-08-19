import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { randomUUID } from "node:crypto";
import { categories, subcategories, products } from "../drizzle/schema";
import { menuData } from "./menu-data";

config({ path: ".env.local" });

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error("TURSO_DATABASE_URL não definida (.env.local)");
  }

  const client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const db = drizzle(client);

  await db.delete(products);
  await db.delete(subcategories);
  await db.delete(categories);

  const now = new Date();
  let categoryCount = 0;
  let subcategoryCount = 0;
  let productCount = 0;

  for (const [categoryIndex, category] of menuData.entries()) {
    const categoryId = randomUUID();
    await db.insert(categories).values({
      id: categoryId,
      name: category.name,
      description: null,
      slug: category.slug,
      displayOrder: categoryIndex,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    categoryCount++;

    for (const [subIndex, sub] of category.subcategories.entries()) {
      const subcategoryId = randomUUID();
      await db.insert(subcategories).values({
        id: subcategoryId,
        categoryId,
        name: sub.name,
        displayOrder: subIndex,
        status: "active",
        createdAt: now,
        updatedAt: now,
      });
      subcategoryCount++;

      for (const [prodIndex, product] of sub.products.entries()) {
        await db.insert(products).values({
          id: randomUUID(),
          name: product.name,
          description: null,
          subcategoryId,
          retailPrice: product.retailPrice,
          wholesalePrice: product.wholesalePrice,
          imageUrl: null,
          displayOrder: prodIndex,
          status: "active",
          createdAt: now,
          updatedAt: now,
        });
        productCount++;
      }
    }
  }

  console.log(
    `Seed concluído: ${categoryCount} categorias, ${subcategoryCount} subcategorias, ${productCount} produtos`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
