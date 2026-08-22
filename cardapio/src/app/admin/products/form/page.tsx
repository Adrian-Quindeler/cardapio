import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { categories, products, subcategories } from "../../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { ProductForm } from "./ProductForm";
import styles from "../../admin-form.module.css";

type PageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function ProductFormPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  const categoryList = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .orderBy(asc(categories.displayOrder));

  const subcategoryList = await db
    .select({
      id: subcategories.id,
      categoryId: subcategories.categoryId,
      name: subcategories.name,
    })
    .from(subcategories)
    .orderBy(asc(subcategories.displayOrder));

  let initialProduct = null;

  if (id) {
    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        categoryId: categories.id,
        subcategoryId: products.subcategoryId,
        retailPrice: products.retailPrice,
        wholesalePrice: products.wholesalePrice,
        imageUrl: products.imageUrl,
        imagePublicId: products.imagePublicId,
        displayOrder: products.displayOrder,
        status: products.status,
      })
      .from(products)
      .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
      .leftJoin(categories, eq(subcategories.categoryId, categories.id))
      .where(eq(products.id, id))
      .limit(1);

    if (!rows[0]) {
      notFound();
    }

    initialProduct = {
      id: rows[0].id,
      name: rows[0].name,
      description: rows[0].description ?? "",
      categoryId: rows[0].categoryId ?? "",
      subcategoryId: rows[0].subcategoryId,
      retailPrice: rows[0].retailPrice,
      wholesalePrice: rows[0].wholesalePrice,
      imageUrl: rows[0].imageUrl ?? "",
      imagePublicId: rows[0].imagePublicId ?? "",
      displayOrder: rows[0].displayOrder,
      status: rows[0].status,
    };
  }

  return (
    <section className={styles.page}>
      <SetAdminTitle title={initialProduct ? "Editar produto" : "Novo produto"} />
      <ProductForm
        product={initialProduct}
        categories={categoryList}
        subcategories={subcategoryList}
      />
    </section>
  );
}
