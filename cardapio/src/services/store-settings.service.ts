import { db } from "@/lib/db";
import { storeSettings } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import type { UpdateStoreSettingsInput } from "@/validations/store-settings.validation";

const SETTINGS_ID = "default";

export class StoreSettingsService {
  async get() {
    const rows = await db
      .select()
      .from(storeSettings)
      .where(eq(storeSettings.id, SETTINGS_ID))
      .limit(1);

    return rows[0] ?? null;
  }

  async upsert(input: UpdateStoreSettingsInput) {
    const existing = await this.get();

    if (existing) {
      await db
        .update(storeSettings)
        .set({
          brandName: input.brandName,
          logoUrl: input.logoUrl || null,
          heroImageUrl: input.heroImageUrl || null,
          heroAlt: input.heroAlt || null,
          updatedAt: new Date(),
        })
        .where(eq(storeSettings.id, SETTINGS_ID));
    } else {
      await db.insert(storeSettings).values({
        id: SETTINGS_ID,
        brandName: input.brandName,
        logoUrl: input.logoUrl || null,
        heroImageUrl: input.heroImageUrl || null,
        heroAlt: input.heroAlt || null,
        updatedAt: new Date(),
      });
    }

    return this.get();
  }
}
