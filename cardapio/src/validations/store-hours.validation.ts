import { z } from "zod";

/**
 * TODO: Schemas Zod de horários de funcionamento.
 */

export const storeHoursSchema = z.object({
  // TODO: dayOfWeek, openTime, closeTime, isClosed
});

export const updateStoreHoursSchema = z.array(storeHoursSchema);

export type StoreHoursInput = z.infer<typeof storeHoursSchema>;
export type UpdateStoreHoursInput = z.infer<typeof updateStoreHoursSchema>;
