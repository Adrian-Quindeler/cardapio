import { db } from "@/lib/db";
import { asc } from "drizzle-orm";
import { categories } from "../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { CategoriesTable } from "./CategoriesTable";
import styles from "../admin-list.module.css";

export default async function AdminCategoriesPage() {
	const listaCategorias = await db
		.select({
			id: categories.id,
			name: categories.name,
			description: categories.description,
			slug: categories.slug,
			displayOrder: categories.displayOrder,
			status: categories.status,
		})
		.from(categories)
		.orderBy(asc(categories.displayOrder));

	return (
		<section className={styles.page}>
			<SetAdminTitle title="Categorias" />
			<CategoriesTable categories={listaCategorias} />
		</section>
	);
}
