import { db } from "@/lib/db";
import { storeSettings } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { ImageService } from "@/services/image.service";
import type { UpdateStoreSettingsInput } from "@/validations/store-settings.validation";

const SETTINGS_ID = "default";

export class StoreSettingsService {
  constructor(private readonly imageService = new ImageService()) {}

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

    const oldLogoPublicId = existing?.logoPublicId ?? "";
    const oldHeroPublicId = existing?.heroPublicId ?? "";
    const newLogoPublicId = input.logoPublicId ?? "";
    const newHeroPublicId = input.heroPublicId ?? "";
    const logoChanged = newLogoPublicId !== oldLogoPublicId;
    const heroChanged = newHeroPublicId !== oldHeroPublicId;

    const values = {
      brandName: input.brandName,
      logoUrl: input.logoUrl || null,
      logoPublicId: newLogoPublicId || null,
      heroImageUrl: input.heroImageUrl || null,
      heroPublicId: newHeroPublicId || null,
      heroAlt: input.heroAlt || null,
      updatedAt: new Date(),
    };

    try {
      if (existing) {
        await db
          .update(storeSettings)
          .set(values)
          .where(eq(storeSettings.id, SETTINGS_ID));
      } else {
        await db.insert(storeSettings).values({
          id: SETTINGS_ID,
          ...values,
        });
      }

      if (logoChanged && oldLogoPublicId) {
        await this.imageService.delete(oldLogoPublicId);
      }

      if (heroChanged && oldHeroPublicId) {
        await this.imageService.delete(oldHeroPublicId);
      }

      return this.get();
    } catch (error) {
      if (logoChanged && newLogoPublicId) {
        await this.imageService.delete(newLogoPublicId);
      }
      if (heroChanged && newHeroPublicId) {
        await this.imageService.delete(newHeroPublicId);
      }
      throw error;
    }
  }
}
