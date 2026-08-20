import Link from "next/link";
import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { subcategories, categories } from "../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "../admin-list.module.css";


export default async function AdminUsersPage() {
	const listaSubcategorias = await db
		.select({
			id: subcategories.id,
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
			<div className={styles.toolbar}>
				<Link href="/admin/subcategories/form" className={styles.newButton}>
					Novo
				</Link>
			</div>
			<div className={styles.tableWrap}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Display Order</th>
						<th>Nome</th>
						<th>Categoria</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{listaSubcategorias.map(async (Subcategoria) => {
						return (
						<tr key={Subcategoria.id} className={styles.clickableRow}>
							<td>
								<Link
									href={`/admin/subcategories/form?id=${Subcategoria.id}`}
									className={styles.stretchedLink}
								>
									{Subcategoria.displayOrder}
								</Link>
							</td>
							<td>{Subcategoria.name}</td>
							<td>{Subcategoria.categoryName}</td>
							<td>{Subcategoria.status}</td>
						</tr>
					);
				})}
				</tbody>
			</table>
			</div>
		</section>
	);
}
