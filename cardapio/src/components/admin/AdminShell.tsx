"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");

    function onViewportChange() {
      if (!media.matches) setMobileOpen(false);
    }

    media.addEventListener("change", onViewportChange);
    return () => media.removeEventListener("change", onViewportChange);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div className={styles.shell}>
      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed((current) => !current)}
        onClose={() => setMobileOpen(false)}
        onNavigate={() => setMobileOpen(false)}
        storeSettings={storeSettings}
      />
      {mobileOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <div className={styles.column}>
        <AdminHeader
          mobileOpen={mobileOpen}
          onMenuClick={() => setMobileOpen((open) => !open)}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
