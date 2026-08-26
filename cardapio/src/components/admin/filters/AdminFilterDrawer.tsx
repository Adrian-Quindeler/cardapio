"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./AdminFilterDrawer.module.css";

type AdminFilterDrawerProps = {
	open: boolean;
	onClose: () => void;
	onSearch: () => void;
	onClear: () => void;
	children: ReactNode;
};

export function AdminFilterDrawer({
	open,
	onClose,
	onSearch,
	onClear,
	children,
}: AdminFilterDrawerProps) {
	useEffect(() => {
		if (!open) {
			return;
		}

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				onClose();
			}
		}

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [open, onClose]);

	if (!open) {
		return null;
	}

	return (
		<>
			<button
				type="button"
				className={styles.backdrop}
				aria-label="Fechar filtros"
				onClick={onClose}
			/>
			<aside className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="admin-filters-title">
				<header className={styles.header}>
					<span />
					<h2 id="admin-filters-title" className={styles.title}>
						Filtros
					</h2>
					<button type="button" className={styles.close} onClick={onClose} aria-label="Fechar filtros">
						<X size={18} />
					</button>
				</header>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						onSearch();
					}}
				>
					<div className={styles.body}>{children}</div>
					<div className={styles.footer}>
						<button type="submit" className={styles.search}>
							Buscar
						</button>
						<button type="button" className={styles.clear} onClick={onClear}>
							Limpar filtros
						</button>
					</div>
				</form>
			</aside>
		</>
	);
}

type FilterFieldProps = {
	label: string;
	children: ReactNode;
};

export function FilterField({ label, children }: FilterFieldProps) {
	return (
		<label className={styles.field}>
			<span>{label}</span>
			{children}
		</label>
	);
}

export { styles as filterFieldStyles };
