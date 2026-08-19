import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { StoreSettingsService } from "@/services/store-settings.service";
import { StoreForm } from "./StoreForm";
import styles from "../admin-form.module.css";

export default async function AdminStorePage() {
  const settings = await new StoreSettingsService().get();

  const initialSettings = settings
    ? {
        brandName: settings.brandName,
        logoUrl: settings.logoUrl ?? "",
        heroImageUrl: settings.heroImageUrl ?? "",
        heroAlt: settings.heroAlt ?? "",
      }
    : null;

  return (
    <section className={styles.page}>
      <SetAdminTitle title="Informações da loja" />
      <StoreForm settings={initialSettings} />
    </section>
  );
}
