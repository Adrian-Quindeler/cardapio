import { AdminShell } from "@/components/admin/AdminShell";
import { getStoreSettings } from "@/lib/home-data";
import styles from "./layout.module.css";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeSettings = await getStoreSettings();

  return (
    <div className={styles.layout}>
      <AdminShell storeSettings={storeSettings}>{children}</AdminShell>
    </div>
  );
}
