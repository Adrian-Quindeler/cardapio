import styles from "./layout.module.css";

/**
 * TODO: Layout da área administrativa.
 * Incluir sidebar, header e estrutura do painel.
 * Acesso protegido por autenticação (middleware).
 */
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.layout}>{children}</div>;
}
