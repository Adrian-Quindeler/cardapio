"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import SubcategorySection from "@/components/home/SubcategorySection";

interface CategorySectionProps {
	category: {
		id: string;
		name: string;
		description: string;
	};
}

export default function CategorySection({ category }: CategorySectionProps) {
	function getSubcategories(category: { id: string; name: string }) {
		return [
			{ id: `${category.id}-1`, name: "Tradicionais" },
			{ id: `${category.id}-2`, name: "Especiais" },
			{ id: `${category.id}-3`, name: "Zero lactose" },
		];
	}

	const subcategories = getSubcategories(category);
	const [activeSubcategory, setActiveSubcategory] = useState(subcategories[0]);
	const description = category.description || "Escolha o seu favorito";

	return (
		<section id={category.name} className={styles.section}>
			<header className={styles.header}>
				<div className={styles.titleBlock}>
					<h2 className={styles.title}>{category.name}</h2>
					<p className={styles.description}>{description}</p>
				</div>
			</header>

			<div className={styles.chips} role="tablist" aria-label={`Subcategorias de ${category.name}`}>
				{subcategories.map((subcategory) => {
					const isActive = activeSubcategory.id === subcategory.id;

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

			<SubcategorySection
				key={activeSubcategory.id}
				subcategory={activeSubcategory}
			/>
		</section>
	);
}
