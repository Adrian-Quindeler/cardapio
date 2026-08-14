"use client";

import { useState } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import styles from "./AdminShell.module.css";

type StoreBrand = {
  brandName: string;
  logoUrl: string | null;
} | null;

export function AdminShell({
  children,
  storeSettings,
}: Readonly<{
  children: React.ReactNode;
  storeSettings: StoreBrand;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.shell}>
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((current) => !current)}
        storeSettings={storeSettings}
      />
      <div className={styles.column}>
        <AdminHeader />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
