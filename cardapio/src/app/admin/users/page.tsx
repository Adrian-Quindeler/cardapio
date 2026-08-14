import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "./page.module.css";

/**
 * TODO: Módulo administrativo de usuários.
 * Cadastrar, editar, ativar/inativar e definir permissões/roles.
 */
export default function AdminUsersPage() {
  return (
    <section className={styles.page}>
      <SetAdminTitle title="Usuários" />
    </section>
  );
}
