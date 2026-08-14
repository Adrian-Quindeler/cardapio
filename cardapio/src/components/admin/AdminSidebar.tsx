"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Home,
  IceCreamCone,
  Layers,
  LogOut,
  Store,
  Tags,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import styles from "./AdminSidebar.module.css";

const QUICK_LINKS = [
  { href: "/admin", label: "Início", icon: Home },
  { href: "/admin/categories", label: "Categorias", icon: Tags },
  { href: "/admin/subcategories", label: "Subcategorias", icon: Layers },
  { href: "/admin/products", label: "Produtos", icon: IceCreamCone },
  { href: "/admin/store-hours", label: "Horários da loja", icon: Clock },
  { href: "/admin/store", label: "Informações da loja", icon: Store },
  { href: "/admin/users", label: "Usuários", icon: Users },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type AdminSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  storeSettings: {
    brandName: string;
    logoUrl: string | null;
  } | null;
};

export function AdminSidebar({
  collapsed,
  onToggle,
  storeSettings,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const brandName = storeSettings?.brandName ?? "Mamute";
  const logoUrl = storeSettings?.logoUrl || "/images/icone.png";

  async function handleLogout() {
    setSigningOut(true);
    try {
      await logout();
      router.replace("/auth/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <aside className={styles.root} data-collapsed={collapsed ? "true" : "false"}>
      <div className={styles.brand}>
        <span className={styles.logo}>
          <Image
            src={logoUrl}
            alt={brandName}
            width={40}
            height={40}
          />
        </span>
        {!collapsed ? <span className={styles.brandName}>{brandName}</span> : null}
        <button
          type="button"
          className={styles.toggle}
          onClick={onToggle}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? (
            <ChevronsRight size={18} strokeWidth={2.2} />
          ) : (
            <ChevronsLeft size={18} strokeWidth={2.2} />
          )}
        </button>
      </div>

      <nav className={styles.nav} aria-label="Acesso rápido">
        {!collapsed ? <p className={styles.sectionLabel}>Acesso rápido</p> : null}
        {QUICK_LINKS.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              data-active={active ? "true" : "false"}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} strokeWidth={2.1} />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className={styles.logout}
        onClick={handleLogout}
        disabled={signingOut}
        title={collapsed ? "Sair da conta" : undefined}
      >
        <LogOut size={18} strokeWidth={2.1} />
        {!collapsed ? (
          <span>{signingOut ? "Saindo…" : "Sair da conta"}</span>
        ) : null}
      </button>
    </aside>
  );
}
