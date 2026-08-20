import styles from "./styles.module.css";

const socialLinks = [
	{
		label: "WhatsApp",
		href: "https://wa.me/5527996519672",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/adrian-jansen-quindeler-602337265",
	},
	{
		label: "Portfólio",
		href: "https://portfolio-pi-eight-70.vercel.app",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/adrian_jq",
	},
] as const;

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.name}>Desenvolvido por: Adrian Jansen Quindeler</p>
			<ul className={styles.links}>
				{socialLinks.map((link) => (
					<li key={link.label} className={styles.linkItem}>
						<a
							className={styles.link}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{"text" in link ? `${link.label}: ${link.text}` : link.label}
						</a>
					</li>
				))}
			</ul>
		</footer>
	);
}
