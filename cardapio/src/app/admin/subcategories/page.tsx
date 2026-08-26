import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { subcategories, categories } from "../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { SubcategoriesTable } from "./SubcategoriesTable";
import styles from "../admin-list.module.css";

export default async function AdminSubcategoriesPage() {
	const listaCategorias = await db
		.select({
			id: categories.id,
			name: categories.name,
		})
		.from(categories)
		.orderBy(asc(categories.displayOrder));

	const listaSubcategorias = await db
		.select({
			id: subcategories.id,
			categoryId: subcategories.categoryId,
			categoryName: categories.name,
			name: subcategories.name,
			displayOrder: subcategories.displayOrder,
			status: subcategories.status,
		})
		.from(subcategories)
		.leftJoin(categories, eq(subcategories.categoryId, categories.id))
		.orderBy(asc(categories.displayOrder), asc(subcategories.displayOrder));

	return (
		<section className={styles.page}>
			<SetAdminTitle title="Subcategorias" />
			<SubcategoriesTable subcategories={listaSubcategorias} categories={listaCategorias} />
		</section>
	);
}
