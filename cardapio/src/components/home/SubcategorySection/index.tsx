import styles from "./styles.module.css";
import ProductCard from "@/components/home/ProductCard";

interface SubcategorySectionProps {
	subcategory: {
		id: string;
		name: string;
	};
}

export default function SubcategorySection({ subcategory }: SubcategorySectionProps) {
	function getProducts(subcategory: { id: string; name: string }) {
		return [
			{ id: `${subcategory.id}-p1`, name: "Açaí" },
			{ id: `${subcategory.id}-p2`, name: "Morango" },
			{ id: `${subcategory.id}-p3`, name: "Chocolate" },
			{ id: `${subcategory.id}-p4`, name: "Ninho" },
		];
	}

	const products = getProducts(subcategory);

	return (
		<section className={styles.section} aria-label={subcategory.name}>
			<div className={styles.grid}>
				{products.map((product, index) => (
					<ProductCard
						key={product.id}
						product={product}
						style={{ animationDelay: `${index * 40}ms` }}
					/>
				))}
			</div>
		</section>
	);
}
