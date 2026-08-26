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

export type CategoryRow = {
	id: string;
	name: string;
	description: string | null;
	slug: string;
	displayOrder: number;
	status: string;
};

const EMPTY_FILTERS = { name: "" };

type CategoriesTableProps = {
	categories: CategoryRow[];
};

export function CategoriesTable({ categories }: CategoriesTableProps) {
	const { applied, apply, clear } = useSessionFilters(ADMIN_FILTER_KEYS.categories, EMPTY_FILTERS);
	const [open, setOpen] = useState(false);
	const [draft, setDraft] = useState(EMPTY_FILTERS);

	const visible = useMemo(
		() => categories.filter((category) => matchesText(category.name, applied.name)),
		[categories, applied.name],
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
				<Link href="/admin/categories/form" className={styles.newButton}>
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
							<th>Descrição</th>
							<th>Slug</th>
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
							visible.map((categoria) => (
								<tr key={categoria.id} className={styles.clickableRow}>
									<td>
										<Link
											href={`/admin/categories/form?id=${categoria.id}`}
											className={styles.stretchedLink}
										>
											{categoria.displayOrder}
										</Link>
									</td>
									<td>{categoria.name}</td>
									<td>{categoria.description}</td>
									<td>{categoria.slug}</td>
									<td>{categoria.status}</td>
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
						type="text"
						autoComplete="off"
						className={filterFieldStyles.input}
						value={draft.name}
						onChange={(event) => setDraft({ name: event.target.value })}
						placeholder="Nome"
					/>
				</FilterField>
			</AdminFilterDrawer>
		</>
	);
}
