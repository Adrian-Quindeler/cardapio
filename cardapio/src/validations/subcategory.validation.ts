import { z } from "zod";

/**
 * TODO: Schemas Zod de subcategorias.
 */

export const createSubcategorySchema = z.object({
  // TODO: categoryId, name, displayOrder, status
});

export const updateSubcategorySchema = createSubcategorySchema.partial();

export type CreateSubcategoryInput = z.infer<typeof createSubcategorySchema>;
export type UpdateSubcategoryInput = z.infer<typeof updateSubcategorySchema>;
