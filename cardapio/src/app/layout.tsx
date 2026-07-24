import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";

/**
 * TODO: Layout raiz da aplicação.
 * Envolve páginas públicas e administrativas.
 */

export const metadata: Metadata = {
  title: "Cardápio Online",
  description: "Cardápio digital da sorveteria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={styles.body}>{children}</body>
    </html>
  );
}
