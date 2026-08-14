import Link from "next/link";
import {
  Clock,
  IceCreamCone,
  Layers,
  Store,
  Tags,
  Users,
} from "lucide-react";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "./page.module.css";

const CARDS = [
  {
    href: "/admin/categories",
    label: "Categorias",
    icon: Tags,
    tone: styles.toneBlue,
  },
  {
    href: "/admin/subcategories",
    label: "Subcategorias",
    icon: Layers,
    tone: styles.toneGreen,
  },
  {
    href: "/admin/products",
    label: "Produtos",
    icon: IceCreamCone,
    tone: styles.tonePurple,
  },
  {
    href: "/admin/store-hours",
    label: "Horários da loja",
    icon: Clock,
    tone: styles.toneOrange,
  },
  {
    href: "/admin/store",
    label: "Informações da loja",
    icon: Store,
    tone: styles.toneRed,
  },
  {
    href: "/admin/users",
    label: "Usuários",
    icon: Users,
    tone: styles.toneTeal,
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <section className={styles.page}>
      <SetAdminTitle title="Painel" />
      <div className={styles.grid}>
        {CARDS.map((card) => {
          const Icon = card.icon;

          return (
            <Link key={card.href} href={card.href} className={styles.card}>
              <span className={`${styles.icon} ${card.tone}`}>
                <Icon size={22} strokeWidth={2} />
              </span>
              <span className={styles.label}>{card.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
