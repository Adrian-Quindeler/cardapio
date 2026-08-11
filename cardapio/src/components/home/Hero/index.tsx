import Image from "next/image";
import styles from "./styles.module.css";

export default function Hero() {
	return (
		<section id="hero" className={styles.hero} aria-label="Destaque">
			<div className={styles.media}>
				<Image
					className={styles.heroImage}
					src="/images/hero.png"
					alt="A felicidade tem sabor — açaís, sorvetes e combinações Mamute"
					width={1980}
					height={434}
					priority
					sizes="100vw"
				/>
			</div>
		</section>
	);
}
