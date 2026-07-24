import { z } from "zod";

/**
 * TODO: Schemas Zod de categorias.
 */

export const createCategorySchema = z.object({
  // TODO: name, displayOrder, status
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
