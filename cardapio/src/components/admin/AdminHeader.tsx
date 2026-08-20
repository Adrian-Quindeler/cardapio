"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Menu } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import styles from "./AdminHeader.module.css";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

type AdminHeaderProps = {
  mobileOpen: boolean;
  onMenuClick: () => void;
};

export function AdminHeader({ mobileOpen, onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, isPending } = useAuth();

  const showBack = pathname !== "/admin";
  const displayName =
    session?.user.name || session?.user.username || session?.user.email || "";
  const role = (session?.user as { role?: string } | undefined)?.role ?? "";
  const initials = displayName ? initialsFromName(displayName) : "—";

  return (
    <header className={styles.root}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-expanded={mobileOpen}
          aria-controls="admin-sidebar"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          <Menu size={18} strokeWidth={2.2} />
        </button>
        {showBack ? (
          <button
            type="button"
            className={styles.back}
            onClick={() => router.push("/admin")}
            aria-label="Voltar ao painel"
          >
            <ArrowLeft size={18} strokeWidth={2.2} />
          </button>
        ) : (
          <span className={styles.backSpacer} aria-hidden="true" />
        )}
      </div>

      <div id="admin-page-title" className={styles.title} />

      <div className={styles.user}>
        {isPending ? (
          <p className={styles.userMuted}>Carregando…</p>
        ) : session ? (
          <>
            <div className={styles.userText}>
              <span className={styles.userName}>{displayName}</span>
              {role ? <span className={styles.userRole}>{role}</span> : null}
            </div>
            <span className={styles.avatar} aria-hidden="true">
              {initials}
            </span>
          </>
        ) : null}
      </div>
    </header>
  );
}
