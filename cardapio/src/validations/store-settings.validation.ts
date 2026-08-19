import { z } from "zod";

export const updateStoreSettingsSchema = z.object({
  brandName: z.string().min(1, "Nome da marca é obrigatório"),
  logoUrl: z.string().optional().default(""),
  heroImageUrl: z.string().optional().default(""),
  heroAlt: z.string().optional().default(""),
});

export type UpdateStoreSettingsInput = z.infer<typeof updateStoreSettingsSchema>;
