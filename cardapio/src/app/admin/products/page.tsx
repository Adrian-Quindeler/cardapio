import Link from "next/link";
import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { products, subcategories, categories } from "../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "../admin-list.module.css";


export default async function AdminUsersPage() {
	const listaProdutos = await db
		.select({
			id: products.id,
			name: products.name,
			description: products.description,
			categoryName: categories.name,
			subcategoryName: subcategories.name,
			retailPrice: products.retailPrice,
			wholesalePrice: products.wholesalePrice,
			imageUrl: products.imageUrl,
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
			<div className={styles.toolbar}>
				<Link href="/admin/products/form" className={styles.newButton}>
					Novo
				</Link>
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
					{listaProdutos.map(async (produto) => {
						return (
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
					);
				})}
				</tbody>
			</table>
			</div>
		</section>
	);
}
