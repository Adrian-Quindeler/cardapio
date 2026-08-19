import { randomUUID } from "node:crypto";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { categories } from "../../drizzle/schema";

type CategoryRow = typeof categories.$inferSelect;

type CreateCategoryRecord = {
  name: string;
  description: string;
  slug: string;
  displayOrder: number;
  status: string;
};

type UpdateCategoryRecord = CreateCategoryRecord;

export class CategoryRepository {
  async findAll(): Promise<CategoryRow[]> {
    return db.select().from(categories).orderBy(asc(categories.displayOrder));
  }

  async findById(id: string): Promise<CategoryRow | null> {
    const [row] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return row ?? null;
  }

  async findBySlug(slug: string): Promise<CategoryRow | null> {
    const [row] = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    return row ?? null;
  }

  async create(data: CreateCategoryRecord): Promise<CategoryRow> {
    const now = new Date();
    const id = randomUUID();

    await db.insert(categories).values({
      id,
      name: data.name,
      description: data.description || null,
      slug: data.slug,
      displayOrder: data.displayOrder,
      status: data.status,
      createdAt: now,
      updatedAt: now,
    });

    const created = await this.findById(id);
    if (!created) throw new Error("Falha ao criar categoria");
    return created;
  }

  async update(id: string, data: UpdateCategoryRecord): Promise<CategoryRow> {
    await db
      .update(categories)
      .set({
        name: data.name,
        description: data.description || null,
        slug: data.slug,
        displayOrder: data.displayOrder,
        status: data.status,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id));

    const updated = await this.findById(id);
    if (!updated) throw new Error("Falha ao atualizar categoria");
    return updated;
  }
}
