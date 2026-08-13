"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import SubcategorySection from "@/components/home/SubcategorySection";

interface Product {
	id: string;
	name: string;
	description: string | null;
	retailPrice: number;
	wholesalePrice: number;
	imageUrl: string | null;
}

interface Subcategory {
	id: string;
	name: string;
	products: Product[];
}

interface CategorySectionProps {
	category: {
		id: string;
		name: string;
		slug: string;
		description: string | null;
	};
	subcategoryList: Subcategory[];
}

export default function CategorySection({ category, subcategoryList }: CategorySectionProps) {
	const [activeSubcategory, setActiveSubcategory] = useState(subcategoryList[0]);
	const description = category.description || "Escolha o seu favorito";

	return (
		<section id={category.slug} className={styles.section}>
			<header className={styles.header}>
				<div className={styles.titleBlock}>
					<h2 className={styles.title}>{category.name}</h2>
					<p className={styles.description}>{description}</p>
				</div>
			</header>

			<div className={styles.chips} role="tablist" aria-label={`Subcategorias de ${category.name}`}>
				{subcategoryList.map((subcategory) => {
					const isActive = activeSubcategory?.id === subcategory.id;

					return (
						<button
							key={subcategory.id}
							type="button"
							role="tab"
							aria-selected={isActive}
							className={
								isActive
									? `${styles.chip} ${styles.chipActive}`
									: styles.chip
							}
							onClick={() => setActiveSubcategory(subcategory)}
						>
							{subcategory.name}
						</button>
					);
				})}
			</div>

			{activeSubcategory && (
				<SubcategorySection
					key={activeSubcategory.id}
					subcategory={activeSubcategory}
					productList={activeSubcategory.products}
				/>
			)}
		</section>
	);
}
