import type { CSSProperties } from "react";
import Image from "next/image";
import { IceCreamCone } from "lucide-react";
import styles from "./styles.module.css";

interface ProductCardProps {
	product: {
		id: string;
		name: string;
		description: string | null;
		retailPrice: number;
		wholesalePrice: number;
		wholesaleQuantity: number;
		imageUrl: string | null;
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
	const hasImage = Boolean(product.imageUrl);

	return (
		<article className={styles.card} style={style}>
			<div className={styles.media}>
				{hasImage ? (
					<Image
						className={styles.image}
						src={product.imageUrl!}
						alt={product.name}
						width={320}
						height={320}
						sizes="(max-width: 768px) 45vw, 20vw"
					/>
				) : (
					<div className={styles.placeholder} aria-hidden="true">
						<IceCreamCone size={40} strokeWidth={1.75} />
					</div>
				)}
			</div>

			<h3 className={styles.name}>{product.name}</h3>

			<div className={styles.prices}>
				<p className={styles.priceRow}>
					Varejo: <strong>{formatPrice(product.retailPrice)}</strong>
				</p>
				{product.wholesalePrice > 0 && (
					<p className={`${styles.priceRow} ${styles.priceRowWholesale}`}>
						Atacado: <strong>{formatPrice(product.wholesalePrice)}</strong>
						<span className={styles.priceWholesaleSpan}>A partir de {product.wholesaleQuantity} unidades</span>
					</p>
				)}
			</div>
		</article>
	);
}
