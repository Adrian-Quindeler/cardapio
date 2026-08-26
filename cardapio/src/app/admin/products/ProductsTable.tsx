"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter } from "lucide-react";
import {
	AdminFilterDrawer,
	FilterField,
	filterFieldStyles,
} from "@/components/admin/filters/AdminFilterDrawer";
import {
	ADMIN_FILTER_KEYS,
	matchesText,
	useSessionFilters,
} from "@/components/admin/filters/useSessionFilters";
import styles from "../admin-list.module.css";

export type ProductRow = {
	id: string;
	name: string;
	categoryId: string | null;
	categoryName: string | null;
	subcategoryId: string;
	subcategoryName: string | null;
	displayOrder: number;
	status: string;
};

export type CategoryOption = {
	id: string;
	name: string;
};

export type SubcategoryOption = {
	id: string;
	categoryId: string;
	name: string;
};

const EMPTY_FILTERS = { name: "", categoryId: "", subcategoryId: "" };

type ProductsTableProps = {
	products: ProductRow[];
	categories: CategoryOption[];
	subcategories: SubcategoryOption[];
};

export function ProductsTable({ products, categories, subcategories }: ProductsTableProps) {
	const { applied, apply, clear } = useSessionFilters(ADMIN_FILTER_KEYS.products, EMPTY_FILTERS);
	const [open, setOpen] = useState(false);
	const [draft, setDraft] = useState(EMPTY_FILTERS);

	const visible = useMemo(
		() =>
			products.filter((product) => {
				if (!matchesText(product.name, applied.name)) {
					return false;
				}
				if (applied.categoryId && product.categoryId !== applied.categoryId) {
					return false;
				}
				if (applied.subcategoryId && product.subcategoryId !== applied.subcategoryId) {
					return false;
				}
				return true;
			}),
		[products, applied],
	);

	const draftSubcategories = draft.categoryId
		? subcategories.filter((subcategory) => subcategory.categoryId === draft.categoryId)
		: subcategories;

	function openFilters() {
		setDraft(applied);
		setOpen(true);
	}

	function handleCategoryChange(categoryId: string) {
		setDraft((current) => {
			const next = { ...current, categoryId };
			if (categoryId && current.subcategoryId) {
				const selected = subcategories.find((item) => item.id === current.subcategoryId);
				if (!selected || selected.categoryId !== categoryId) {
					next.subcategoryId = "";
				}
			}
			return next;
		});
	}

	function handleSearch() {
		apply(draft);
		setOpen(false);
	}

	function handleClear() {
		setDraft(EMPTY_FILTERS);
		clear();
		setOpen(false);
	}

	return (
		<>
			<div className={styles.toolbar}>
				<Link href="/admin/products/form" className={styles.newButton}>
					Novo
				</Link>
				<button type="button" className={styles.filterButton} onClick={openFilters}>
					Filtro
					<Filter size={16} />
				</button>
			</div>
			<div className={styles.tableWrap}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Ordem</th>
							<th>Nome</th>
							<th>Categoria</th>
							<th>Subcategoria</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{visible.length === 0 ? (
							<tr>
								<td className={styles.emptyCell} colSpan={5}>
									Nenhum registro encontrado.
								</td>
							</tr>
						) : (
							visible.map((produto) => (
								<tr key={produto.id} className={styles.clickableRow}>
									<td>
										<Link
											href={`/admin/products/form?id=${produto.id}`}
											className={styles.stretchedLink}
										>
											{produto.displayOrder}
										</Link>
									</td>
									<td>{produto.name}</td>
									<td>{produto.categoryName}</td>
									<td>{produto.subcategoryName}</td>
									<td>{produto.status}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<AdminFilterDrawer
				open={open}
				onClose={() => setOpen(false)}
				onSearch={handleSearch}
				onClear={handleClear}
			>
				<FilterField label="Categoria">
					<select
						className={filterFieldStyles.input}
						value={draft.categoryId}
						onChange={(event) => handleCategoryChange(event.target.value)}
					>
						<option value="">Todas</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</FilterField>
				<FilterField label="Subcategoria">
					<select
						className={filterFieldStyles.input}
						value={draft.subcategoryId}
						onChange={(event) =>
							setDraft((current) => ({ ...current, subcategoryId: event.target.value }))
						}
					>
						<option value="">Todas</option>
						{draftSubcategories.map((subcategory) => (
							<option key={subcategory.id} value={subcategory.id}>
								{subcategory.name}
							</option>
						))}
					</select>
				</FilterField>
				<FilterField label="Nome">
					<input
						type="text"
						autoComplete="off"
						className={filterFieldStyles.input}
						value={draft.name}
						onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
						placeholder="Nome"
					/>
				</FilterField>
			</AdminFilterDrawer>
		</>
	);
}
