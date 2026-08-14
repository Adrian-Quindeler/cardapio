import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "./page.module.css";

/**
 * TODO: Módulo administrativo de categorias.
 * CRUD completo: listar, criar, editar, ativar/inativar.
 */
export default function AdminCategoriesPage() {
  return (
    <section className={styles.page}>
      <SetAdminTitle title="Categorias" />
    </section>
  );
}
