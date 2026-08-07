import styles from "./page.module.css";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import Footer from "@/components/home/Footer";

/**
 * TODO: Página pública do cardápio.
 * Exibir categorias, subcategorias, produtos, preços (varejo/atacado)
 * e status da loja (aberta/fechada) com horário de funcionamento.
 * Sem autenticação.
 */

export default function HomePage() {
	return (
		<>
			<Navbar />
			<main className={styles.main}>
				<Hero />
				<CategorySection />
			</main>
			<Footer />
		</>
	);
}
