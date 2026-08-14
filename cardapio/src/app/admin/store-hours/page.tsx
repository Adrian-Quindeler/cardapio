import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "./page.module.css";

/**
 * TODO: Módulo administrativo de horários de funcionamento.
 * Gerenciar abertura, fechamento e indicador de fechado por dia da semana.
 */
export default function AdminStoreHoursPage() {
  return (
    <section className={styles.page}>
      <SetAdminTitle title="Horários da loja" />
    </section>
  );
}
