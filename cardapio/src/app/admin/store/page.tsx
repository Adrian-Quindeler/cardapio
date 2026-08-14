import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "./page.module.css";

/**
 * TODO: Módulo administrativo de informações da loja.
 * Editar nome, logo e demais dados de store_settings.
 */
export default function AdminStorePage() {
  return (
    <section className={styles.page}>
      <SetAdminTitle title="Informações da loja" />
    </section>
  );
}
