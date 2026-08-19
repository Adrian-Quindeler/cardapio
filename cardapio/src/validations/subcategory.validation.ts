import { z } from "zod";

const statusSchema = z.enum(["active", "inactive"]);

export const createSubcategorySchema = z.object({
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  name: z.string().trim().min(1, "Nome é obrigatório"),
  displayOrder: z.number().int().min(0).default(0),
  status: statusSchema.default("active"),
});

export const updateSubcategorySchema = createSubcategorySchema;

export type CreateSubcategoryInput = z.infer<typeof createSubcategorySchema>;
export type UpdateSubcategoryInput = z.infer<typeof updateSubcategorySchema>;
