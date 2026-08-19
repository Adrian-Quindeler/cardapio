import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { storeHours } from "../../drizzle/schema";
import { asc, eq } from "drizzle-orm";
import type { StoreHoursInput } from "@/validations/store-hours.validation";

export class StoreHoursService {
  async list() {
    return db
      .select()
      .from(storeHours)
      .orderBy(asc(storeHours.dayOfWeek));
  }

  async upsertAll(hours: StoreHoursInput[]) {
    const existing = await this.list();
    const existingByDay = new Map(existing.map((h) => [h.dayOfWeek, h]));

    for (const hour of hours) {
      const row = existingByDay.get(hour.dayOfWeek);

      if (row) {
        await db
          .update(storeHours)
          .set({
            openTime: hour.isClosed ? null : hour.openTime,
            closeTime: hour.isClosed ? null : hour.closeTime,
            isClosed: hour.isClosed,
          })
          .where(eq(storeHours.id, row.id));
      } else {
        await db.insert(storeHours).values({
          id: randomUUID(),
          dayOfWeek: hour.dayOfWeek,
          openTime: hour.isClosed ? null : hour.openTime,
          closeTime: hour.isClosed ? null : hour.closeTime,
          isClosed: hour.isClosed,
        });
      }
    }

    return this.list();
  }
}
