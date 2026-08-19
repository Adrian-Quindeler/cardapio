import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { categories } from "../../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { CategoryForm } from "./CategoryForm";
import styles from "../../admin-form.module.css";

type PageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function CategoryFormPage({ searchParams }: PageProps) {
  const { id } = await searchParams;
  let initialCategory = null;

  if (id) {
    const rows = await db
      .select({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        slug: categories.slug,
        displayOrder: categories.displayOrder,
        status: categories.status,
      })
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!rows[0]) {
      notFound();
    }

    initialCategory = {
      id: rows[0].id,
      name: rows[0].name,
      description: rows[0].description ?? "",
      slug: rows[0].slug,
      displayOrder: rows[0].displayOrder,
      status: rows[0].status,
    };
  }

  return (
    <section className={styles.page}>
      <SetAdminTitle title={initialCategory ? "Editar categoria" : "Nova categoria"} />
      <CategoryForm category={initialCategory} />
    </section>
  );
}
