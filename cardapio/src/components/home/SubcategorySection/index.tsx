import ProductCard from "@/components/home/ProductCard";
import styles from "./styles.module.css";

interface Product {
	id: string;
	name: string;
	description: string | null;
	retailPrice: number;
	wholesalePrice: number;
	imageUrl: string | null;
}

interface SubcategorySectionProps {
	subcategory: {
		id: string;
		name: string;
	};
	productList: Product[];
}

export default function SubcategorySection({ subcategory, productList }: SubcategorySectionProps) {
	return (
		<section className={styles.section} aria-label={subcategory.name}>
			<div className={styles.grid}>
				{productList.map((product, index) => (
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
