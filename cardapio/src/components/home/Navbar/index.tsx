"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

const categories = [
	{ href: "#caixas", label: "Caixas" },
	{ href: "#potes", label: "Potes" },
	{ href: "#picoles", label: "Picolés" }
];

export default function Navbar() {
	const [activeCategory, setActiveCategory] = useState("#caixas");

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if(entry.isIntersecting) {
					setActiveCategory(`#${entry.target.id}`);
				}
			});
		},
		{ 
			threshold: 0.6, 
			rootMargin: "-70px 0px 0px 0px",
		});

		categories.forEach(({ href }) => {
			const element = document.getElementById(href.slice(1));
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	}, []);
	
	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Link href="/" className={styles.logo} aria-label="Mamute — início">
					<Image
						src="/images/icone.png"
						alt="Mamute Loja da Fábrica"
						width={72}
						height={72}
						priority
					/>
				</Link>
				<div className={styles.brandContainer}>
					<span className={styles.brandText}>
						<span className={styles.brandName}>Mamute Br 262</span>
					</span>
					<div className={styles.info}>
						<div className={styles.hoursTrigger}>
							<span
								className={styles.status}
								data-open="true"
								tabIndex={0}
								aria-describedby="store-hours-tooltip"
							>
								<span className={styles.statusDot} aria-hidden="true" />
								Aberto
							</span>
							<div
								id="store-hours-tooltip"
								className={styles.hoursDropdown}
								role="tooltip"
							>
								<p className={styles.hoursTitle}>Horário de funcionamento</p>
								<ul className={styles.hoursList}>
									<li>
										<span>Seg–Sex</span>
										<span>12h – 20h</span>
									</li>
									<li>
										<span>Sábado</span>
										<span>10h – 20h</span>
									</li>
									<li>
										<span>Domingo</span>
										<span>10h – 16h</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>


			<nav className={styles.nav} aria-label="Categorias">
				{categories.map(({href, label}, index) => (
					<a
						key={href}
						href={href}
						className={href == activeCategory ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
						onClick={() => setActiveCategory(href)}
					>
						<span>{label}</span>
					</a>
				))}
			</nav>
		</header>
	);
}
