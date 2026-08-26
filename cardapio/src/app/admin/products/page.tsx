import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { products, subcategories, categories } from "../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { ProductsTable } from "./ProductsTable";
import styles from "../admin-list.module.css";

export default async function AdminProductsPage() {
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
			name: subcategories.name,
		})
		.from(subcategories)
		.orderBy(asc(subcategories.displayOrder));

	const listaProdutos = await db
		.select({
			id: products.id,
			name: products.name,
			categoryId: categories.id,
			categoryName: categories.name,
			subcategoryId: products.subcategoryId,
			subcategoryName: subcategories.name,
			status: products.status,
			displayOrder: products.displayOrder,
		})
		.from(products)
		.leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
		.leftJoin(categories, eq(subcategories.categoryId, categories.id))
		.orderBy(
			asc(categories.displayOrder),
			asc(subcategories.displayOrder),
			asc(products.displayOrder),
		);

	return (
		<section className={styles.page}>
			<SetAdminTitle title="Produtos" />
			<ProductsTable
				products={listaProdutos}
				categories={listaCategorias}
				subcategories={listaSubcategorias}
			/>
		</section>
	);
}
