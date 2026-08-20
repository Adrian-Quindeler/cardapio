import { getHomePageData } from "@/lib/home-data";
import CategorySection from "@/components/home/CategorySection";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function HomePage() {
	const { categoryRows, categoryList, storeSettings, storeHours } = await getHomePageData();

	return (
		<>
			<Header
				categoryList={categoryRows}
				storeSettings={storeSettings}
				storeHours={storeHours}
			/>

			<main className={styles.main}>
				<Hero
					heroImageUrl={storeSettings?.heroImageUrl}
					heroAlt={storeSettings?.heroAlt}
				/>

				{categoryList.map((category) => {
					const { subcategories: subcategoryList, ...categoryData } = category;

					return (
						<CategorySection
							key={category.id}
							category={categoryData}
							subcategoryList={subcategoryList}
						/>
					);
				})}
			</main>

			<Footer />
		</>
	);
}
