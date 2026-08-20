import Link from "next/link";
import { db } from "@/lib/db";
import { asc } from "drizzle-orm";
import { user } from "../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import styles from "../admin-list.module.css";

const ROLE_LABEL: Record<string, string> = {
	admin: "Administrador",
	manager: "Gerente",
};

const STATUS_LABEL: Record<string, string> = {
	active: "Ativo",
	inactive: "Inativo",
};

export default async function AdminUsersPage() {
	const listaUsuarios = await db
		.select({
			id: user.id,
			name: user.name,
			username: user.username,
			displayUsername: user.displayUsername,
			role: user.role,
			status: user.status,
		})
		.from(user)
		.orderBy(asc(user.name));

	return (
		<section className={styles.page}>
			<SetAdminTitle title="Usuários" />
			<div className={styles.toolbar}>
				<Link href="/admin/users/form" className={styles.newButton}>
					Novo
				</Link>
			</div>
			<div className={styles.tableWrap}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Usuário</th>
						<th>Display</th>
						<th>Papel</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{listaUsuarios.map((usuario) => (
						<tr key={usuario.id} className={styles.clickableRow}>
							<td>
								<Link
									href={`/admin/users/form?id=${usuario.id}`}
									className={styles.stretchedLink}
								>
									{usuario.name}
								</Link>
							</td>
							<td>{usuario.username}</td>
							<td>{usuario.displayUsername}</td>
							<td>{ROLE_LABEL[usuario.role] ?? usuario.role}</td>
							<td>{STATUS_LABEL[usuario.status] ?? usuario.status}</td>
						</tr>
					))}
				</tbody>
			</table>
			</div>
		</section>
	);
}
