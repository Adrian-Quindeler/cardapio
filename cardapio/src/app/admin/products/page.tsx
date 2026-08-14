import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "./page.module.css";

/**
 * TODO: Módulo administrativo de produtos.
 * CRUD completo: listar, criar, editar, ativar/inativar.
 */
export default function AdminProductsPage() {
  return (
    <section className={styles.page}>
      <SetAdminTitle title="Produtos" />
    </section>
  );
}
