import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "./page.module.css";

/**
 * TODO: Módulo administrativo de subcategorias.
 * CRUD completo: listar, criar, editar, ativar/inativar.
 */
export default function AdminSubcategoriesPage() {
  return (
    <section className={styles.page}>
      <SetAdminTitle title="Subcategorias" />
    </section>
  );
}
