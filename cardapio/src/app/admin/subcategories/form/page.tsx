import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { subcategories, categories } from "../../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { SubcategoryForm } from "./SubcategoryForm";
import styles from "../../admin-form.module.css";

type PageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function SubcategoryFormPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  const categoryList = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .orderBy(asc(categories.displayOrder));

  let initialSubcategory = null;

  if (id) {
    const rows = await db
      .select({
        id: subcategories.id,
        categoryId: subcategories.categoryId,
        name: subcategories.name,
        displayOrder: subcategories.displayOrder,
        status: subcategories.status,
      })
      .from(subcategories)
      .where(eq(subcategories.id, id))
      .limit(1);

    if (!rows[0]) {
      notFound();
    }

    initialSubcategory = {
      id: rows[0].id,
      categoryId: rows[0].categoryId,
      name: rows[0].name,
      displayOrder: rows[0].displayOrder,
      status: rows[0].status,
    };
  }

  return (
    <section className={styles.page}>
      <SetAdminTitle title={initialSubcategory ? "Editar subcategoria" : "Nova subcategoria"} />
      <SubcategoryForm subcategory={initialSubcategory} categories={categoryList} />
    </section>
  );
}
