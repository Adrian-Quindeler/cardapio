import { z } from "zod";

export const storeHoursSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  openTime: z.string().regex(/^\d{2}:\d{2}$/, "Formato HH:mm").nullable(),
  closeTime: z.string().regex(/^\d{2}:\d{2}$/, "Formato HH:mm").nullable(),
  isClosed: z.boolean(),
});

export const updateStoreHoursSchema = z.array(storeHoursSchema).length(7);

export type StoreHoursInput = z.infer<typeof storeHoursSchema>;
export type UpdateStoreHoursInput = z.infer<typeof updateStoreHoursSchema>;
