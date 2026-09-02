import { z } from "zod";

const statusSchema = z.enum(["active", "inactive"]);

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  description: z.string().trim().optional().default(""),
  subcategoryId: z.string().min(1, "Subcategoria é obrigatória"),
  retailPrice: z.number().min(0, "Preço varejo deve ser >= 0"),
  wholesalePrice: z.number().min(0, "Preço atacado deve ser >= 0"),
  wholesaleQuantity: z.number().int().min(1).default(50),
  imageUrl: z.string().trim().optional().default(""),
  imagePublicId: z.string().trim().optional().default(""),
  displayOrder: z.number().int().min(0).default(0),
  status: statusSchema.default("active"),
});

export const updateProductSchema = createProductSchema;

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
