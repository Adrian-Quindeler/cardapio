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

export type SubcategoryRow = {
	id: string;
	categoryId: string | null;
	categoryName: string | null;
	name: string;
	displayOrder: number;
	status: string;
};

export type CategoryOption = {
	id: string;
	name: string;
};

const EMPTY_FILTERS = { name: "", categoryId: "" };

type SubcategoriesTableProps = {
	subcategories: SubcategoryRow[];
	categories: CategoryOption[];
};

export function SubcategoriesTable({ subcategories, categories }: SubcategoriesTableProps) {
	const { applied, apply, clear } = useSessionFilters(
		ADMIN_FILTER_KEYS.subcategories,
		EMPTY_FILTERS,
	);
	const [open, setOpen] = useState(false);
	const [draft, setDraft] = useState(EMPTY_FILTERS);

	const visible = useMemo(
		() =>
			subcategories.filter((subcategory) => {
				if (!matchesText(subcategory.name, applied.name)) {
					return false;
				}
				if (applied.categoryId && subcategory.categoryId !== applied.categoryId) {
					return false;
				}
				return true;
			}),
		[subcategories, applied],
	);

	function openFilters() {
		setDraft(applied);
		setOpen(true);
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
				<Link href="/admin/subcategories/form" className={styles.newButton}>
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
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{visible.length === 0 ? (
							<tr>
								<td className={styles.emptyCell} colSpan={4}>
									Nenhum registro encontrado.
								</td>
							</tr>
						) : (
							visible.map((subcategoria) => (
								<tr key={subcategoria.id} className={styles.clickableRow}>
									<td>
										<Link
											href={`/admin/subcategories/form?id=${subcategoria.id}`}
											className={styles.stretchedLink}
										>
											{subcategoria.displayOrder}
										</Link>
									</td>
									<td>{subcategoria.name}</td>
									<td>{subcategoria.categoryName}</td>
									<td>{subcategoria.status}</td>
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
				<FilterField label="Nome">
					<input
						className={filterFieldStyles.input}
						value={draft.name}
						onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
						placeholder="Nome"
					/>
				</FilterField>
				<FilterField label="Categoria">
					<select
						className={filterFieldStyles.input}
						value={draft.categoryId}
						onChange={(event) =>
							setDraft((current) => ({ ...current, categoryId: event.target.value }))
						}
					>
						<option value="">Todas</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</FilterField>
			</AdminFilterDrawer>
		</>
	);
}
