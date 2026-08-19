import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { asc, eq } from "drizzle-orm";
import { products, subcategories } from "../../../../../drizzle/schema";
import { SetAdminTitle } from "@/components/admin/SetAdminTitle";
import { ProductForm } from "./ProductForm";
import styles from "../../admin-form.module.css";

type PageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function ProductFormPage({ searchParams }: PageProps) {
  const { id } = await searchParams;

  const subcategoryList = await db
    .select({ id: subcategories.id, name: subcategories.name })
    .from(subcategories)
    .orderBy(asc(subcategories.displayOrder));

  let initialProduct = null;

  if (id) {
    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        subcategoryId: products.subcategoryId,
        retailPrice: products.retailPrice,
        wholesalePrice: products.wholesalePrice,
        imageUrl: products.imageUrl,
        displayOrder: products.displayOrder,
        status: products.status,
      })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!rows[0]) {
      notFound();
    }

    initialProduct = {
      id: rows[0].id,
      name: rows[0].name,
      description: rows[0].description ?? "",
      subcategoryId: rows[0].subcategoryId,
      retailPrice: rows[0].retailPrice,
      wholesalePrice: rows[0].wholesalePrice,
      imageUrl: rows[0].imageUrl ?? "",
      displayOrder: rows[0].displayOrder,
      status: rows[0].status,
    };
  }

  return (
    <section className={styles.page}>
      <SetAdminTitle title={initialProduct ? "Editar produto" : "Novo produto"} />
      <ProductForm product={initialProduct} subcategories={subcategoryList} />
    </section>
  );
}
