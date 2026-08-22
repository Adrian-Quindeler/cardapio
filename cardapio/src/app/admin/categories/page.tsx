import Link from "next/link";
import { db } from "@/lib/db";
import { asc } from "drizzle-orm";
import { categories } from "../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "../admin-list.module.css";


export default async function AdminUsersPage() {
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
			<div className={styles.toolbar}>
				<Link href="/admin/categories/form" className={styles.newButton}>
					Novo
				</Link>
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
					{listaCategorias.map((categoria) => (
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
					))}
				</tbody>
			</table>
			</div>
		</section>
	);
}
