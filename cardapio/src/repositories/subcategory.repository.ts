import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { subcategories } from "../../drizzle/schema";

type SubcategoryRow = typeof subcategories.$inferSelect;

type CreateSubcategoryRecord = {
  categoryId: string;
  name: string;
  displayOrder: number;
  status: string;
};

type UpdateSubcategoryRecord = CreateSubcategoryRecord;

export class SubcategoryRepository {
  async findAll(): Promise<SubcategoryRow[]> {
    return db.select().from(subcategories).orderBy(asc(subcategories.displayOrder));
  }

  async findById(id: string): Promise<SubcategoryRow | null> {
    const [row] = await db.select().from(subcategories).where(eq(subcategories.id, id)).limit(1);
    return row ?? null;
  }

  async create(data: CreateSubcategoryRecord): Promise<SubcategoryRow> {
    const now = new Date();
    const id = randomUUID();

    await db.insert(subcategories).values({
      id,
      categoryId: data.categoryId,
      name: data.name,
      displayOrder: data.displayOrder,
      status: data.status,
      createdAt: now,
      updatedAt: now,
    });

    const created = await this.findById(id);
    if (!created) throw new Error("Falha ao criar subcategoria");
    return created;
  }

  async update(id: string, data: UpdateSubcategoryRecord): Promise<SubcategoryRow> {
    await db
      .update(subcategories)
      .set({
        categoryId: data.categoryId,
        name: data.name,
        displayOrder: data.displayOrder,
        status: data.status,
        updatedAt: new Date(),
      })
      .where(eq(subcategories.id, id));

    const updated = await this.findById(id);
    if (!updated) throw new Error("Falha ao atualizar subcategoria");
    return updated;
  }
}
