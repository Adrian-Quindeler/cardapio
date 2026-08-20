import Image from "next/image";
import styles from "./styles.module.css";

type HeroProps = {
	heroImageUrl?: string | null;
	heroAlt?: string | null;
};

const DEFAULT_HERO_SRC = "/images/hero.png";
const DEFAULT_HERO_ALT =
	"A felicidade tem sabor — açaís, sorvetes e combinações Mamute";

export default function Hero({ heroImageUrl, heroAlt }: HeroProps) {
	const src = heroImageUrl || DEFAULT_HERO_SRC;
	const alt = heroAlt || DEFAULT_HERO_ALT;

	return (
		<section id="hero" className={styles.hero} aria-label="Destaque">
			<div className={styles.media}>
				<Image
					className={styles.heroImage}
					src={src}
					alt={alt}
					width={1980}
					height={434}
					priority
					sizes="100vw"
				/>
			</div>
		</section>
	);
}
