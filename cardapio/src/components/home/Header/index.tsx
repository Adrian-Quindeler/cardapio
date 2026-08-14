"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { groupStoreHoursForDisplay, isStoreOpenNow } from "@/lib/store-hours";

interface HeaderProps {
	categoryList: {
		id: string;
		name: string;
		slug: string;
	}[];
	storeSettings: {
		brandName: string;
		logoUrl: string | null;
	} | null;
	storeHours: {
		dayOfWeek: number;
		openTime: string | null;
		closeTime: string | null;
		isClosed: boolean;
	}[];
}

function categoryHref(slug: string) {
	return `#${slug}`;
}

export default function Header({
	categoryList,
	storeSettings,
	storeHours,
}: HeaderProps) {
	const brandName = storeSettings?.brandName ?? "Mamute";
	const logoUrl = storeSettings?.logoUrl ?? "/images/icone.png";
	const isOpen = isStoreOpenNow(storeHours);
	const hoursGroups = groupStoreHoursForDisplay(storeHours);

	const firstSlug = categoryList[0]?.slug;
	const [activeCategory, setActiveCategory] = useState(
		firstSlug ? categoryHref(firstSlug) : "",
	);

	useEffect(() => {
		if (categoryList.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveCategory(categoryHref(entry.target.id));
					}
				});
			},
			{
				threshold: 0.6,
				rootMargin: "-70px 0px 0px 0px",
			},
		);

		categoryList.forEach(({ slug }) => {
			const element = document.getElementById(slug);
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	}, [categoryList]);

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Link href="/" className={styles.logo} aria-label={`${brandName} — início`}>
					<Image
						src={logoUrl}
						alt={brandName}
						width={72}
						height={72}
						priority
					/>
				</Link>
				<div className={styles.brandContainer}>
					<span className={styles.brandText}>
						<span className={styles.brandName}>{brandName}</span>
					</span>
					<div className={styles.info}>
						<div className={styles.hoursTrigger}>
							<span
								className={styles.status}
								data-open={isOpen}
								tabIndex={0}
								aria-describedby="store-hours-tooltip"
							>
								<span className={styles.statusDot} aria-hidden="true" />
								{isOpen ? "Aberto" : "Fechado"}
							</span>
							<div
								id="store-hours-tooltip"
								className={styles.hoursDropdown}
								role="tooltip"
							>
								<p className={styles.hoursTitle}>Horário de funcionamento</p>
								<ul className={styles.hoursList}>
									{hoursGroups.map((group) => (
										<li key={group.label}>
											<span>{group.label}</span>
											<span>{group.hours}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.menuTitle}>
				<h1>Cardápio</h1>
			</div>

			<nav className={styles.nav} aria-label="Categorias">
				{categoryList.map((category) => {
					const href = categoryHref(category.slug);

					return (
						<a
							key={category.id}
							href={href}
							className={
								href === activeCategory
									? `${styles.navItem} ${styles.navItemActive}`
									: styles.navItem
							}
							onClick={() => setActiveCategory(href)}
						>
							<span>{category.name}</span>
						</a>
					);
				})}
			</nav>
		</header>
	);
}
