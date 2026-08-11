import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface ProductCardProps {
	product: {
		id: string;
		name: string;
	};
	style?: CSSProperties;
}

function formatPrice(value: number) {
	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}

export default function ProductCard({ product, style }: ProductCardProps) {
	function getProductDetails(product: { id: string; name: string }) {
		return {
			image: "",
			retailPrice: 18,
			wholesalePrice: 14.4,
			name: product.name,
		};
	}

	const details = getProductDetails(product);
	const hasImage = Boolean(details.image);

	return (
		<article className={styles.card} style={style}>
			<div className={styles.media}>
				{hasImage ? (
					<Image
						className={styles.image}
						src={details.image}
						alt={details.name}
						width={320}
						height={320}
						sizes="(max-width: 768px) 45vw, 20vw"
					/>
				) : (
					<div className={styles.placeholder} aria-hidden="true">
						<i className="fa-solid fa-ice-cream" />
					</div>
				)}
			</div>

			<h3 className={styles.name}>{details.name}</h3>

			<div className={styles.prices}>
				<p className={styles.priceRow}>
					Varejo: <strong>{formatPrice(details.retailPrice)}</strong>
				</p>
				<p className={`${styles.priceRow} ${styles.priceRowWholesale}`}>
					Atacado: <strong>{formatPrice(details.wholesalePrice)}</strong>
				</p>
			</div>
		</article>
	);
}
