import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { categories } from "../../drizzle/schema";
import CategorySection from "@/components/home/CategorySection";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import Hero   from "@/components/home/Hero";
import styles from "./page.module.css";

export default async function HomePage() {
	const categoryList = await db
		.select({
			id: categories.id,
			name: categories.name,
			description: categories.description,
		})
		.from(categories)
		.where(eq(categories.status, "active"))
		.orderBy(asc(categories.displayOrder));

	return (
		<>
			<Navbar />

			<main className={styles.main}>
				<Hero />

				{categoryList.map((category) => {
					return (
						<CategorySection
							key={category.id}
							category={category as { id: string; name: string; description: string }}
						/>
					);
				})}
			</main>

			<Footer />
		</>
	);
}
