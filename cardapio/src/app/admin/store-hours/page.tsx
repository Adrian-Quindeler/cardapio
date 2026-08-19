import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { StoreHoursService } from "@/services/store-hours.service";
import { StoreHoursForm } from "./StoreHoursForm";
import styles from "../admin-form.module.css";

export default async function AdminStoreHoursPage() {
  const hours = await new StoreHoursService().list();

  const initialHours = hours.map((h) => ({
    dayOfWeek: h.dayOfWeek,
    openTime: h.openTime,
    closeTime: h.closeTime,
    isClosed: h.isClosed,
  }));

  return (
    <section className={styles.page}>
      <SetAdminTitle title="Horários da loja" />
      <StoreHoursForm hours={initialHours} />
    </section>
  );
}
