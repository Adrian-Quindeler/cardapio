import { notFound } from "next/navigation";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { UserService } from "@/services/user.service";
import { UserForm } from "./UserForm";
import styles from "../../admin-form.module.css";

type PageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function UserFormPage({ searchParams }: PageProps) {
  const { id } = await searchParams;
  let initialUser = null;

  if (id) {
    const user = await new UserService().findById(id);
    if (!user) {
      notFound();
    }

    initialUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username ?? "",
      displayUsername: user.displayUsername ?? "",
      role: user.role,
      status: user.status,
    };
  }

  return (
    <section className={styles.page}>
      <SetAdminTitle title={initialUser ? "Editar usuário" : "Novo usuário"} />
      <UserForm user={initialUser} />
    </section>
  );
}
