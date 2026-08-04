import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mamute | Cardápio Online",
  description: "Cardápio digital da sorveteria Mamute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${quicksand.variable} ${styles.body}`}>{children}</body>
    </html>
  );
}
