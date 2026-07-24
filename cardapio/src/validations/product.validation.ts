import { z } from "zod";

/**
 * TODO: Schemas Zod de produtos.
 * Usados pelos Route Handlers para validar entrada antes de chamar o Service.
 */

export const createProductSchema = z.object({
  // TODO: name, description, categoryId, subcategoryId, retailPrice, wholesalePrice, status, displayOrder
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
