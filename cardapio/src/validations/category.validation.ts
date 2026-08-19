import { z } from "zod";

const statusSchema = z.enum(["active", "inactive"]);

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  description: z.string().trim().optional().default(""),
  slug: z.string().trim().min(1, "Slug é obrigatório"),
  displayOrder: z.number().int().min(0).default(0),
  status: statusSchema.default("active"),
});

export const updateCategorySchema = createCategorySchema;

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
