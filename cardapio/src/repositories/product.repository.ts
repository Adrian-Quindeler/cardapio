import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "../../drizzle/schema";

type ProductRow = typeof products.$inferSelect;

type CreateProductRecord = {
  name: string;
  description: string;
  subcategoryId: string;
  retailPrice: number;
  wholesalePrice: number;
  imageUrl: string;
  displayOrder: number;
  status: string;
};

type UpdateProductRecord = CreateProductRecord;

export class ProductRepository {
  async findAll(): Promise<ProductRow[]> {
    return db.select().from(products).orderBy(asc(products.displayOrder));
  }

  async findById(id: string): Promise<ProductRow | null> {
    const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return row ?? null;
  }

  async create(data: CreateProductRecord): Promise<ProductRow> {
    const now = new Date();
    const id = randomUUID();

    await db.insert(products).values({
      id,
      name: data.name,
      description: data.description || null,
      subcategoryId: data.subcategoryId,
      retailPrice: data.retailPrice,
      wholesalePrice: data.wholesalePrice,
      imageUrl: data.imageUrl || null,
      displayOrder: data.displayOrder,
      status: data.status,
      createdAt: now,
      updatedAt: now,
    });

    const created = await this.findById(id);
    if (!created) throw new Error("Falha ao criar produto");
    return created;
  }

  async update(id: string, data: UpdateProductRecord): Promise<ProductRow> {
    await db
      .update(products)
      .set({
        name: data.name,
        description: data.description || null,
        subcategoryId: data.subcategoryId,
        retailPrice: data.retailPrice,
        wholesalePrice: data.wholesalePrice,
        imageUrl: data.imageUrl || null,
        displayOrder: data.displayOrder,
        status: data.status,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id));

    const updated = await this.findById(id);
    if (!updated) throw new Error("Falha ao atualizar produto");
    return updated;
  }
}
