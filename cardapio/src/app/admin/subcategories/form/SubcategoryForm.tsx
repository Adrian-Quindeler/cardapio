"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../admin-form.module.css";

export type SubcategoryFormData = {
  id: string;
  categoryId: string;
  name: string;
  displayOrder: number;
  status: string;
};

type CategoryOption = {
  id: string;
  name: string;
};

type SubcategoryFormProps = {
  subcategory: SubcategoryFormData | null;
  categories: CategoryOption[];
};

export function SubcategoryForm({ subcategory, categories }: SubcategoryFormProps) {
  const router = useRouter();
  const isEdit = Boolean(subcategory);

  const [categoryId, setCategoryId] = useState(subcategory?.categoryId ?? (categories[0]?.id ?? ""));
  const [name, setName] = useState(subcategory?.name ?? "");
  const [displayOrder, setDisplayOrder] = useState(subcategory?.displayOrder ?? 0);
  const [status, setStatus] = useState(subcategory?.status ?? "active");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      categoryId,
      name: name.trim(),
      displayOrder,
      status,
    };

    try {
      const response = await fetch(
        isEdit ? `/api/subcategories/${subcategory?.id}` : "/api/subcategories",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setError(data?.message ?? "Não foi possível salvar a subcategoria.");
        return;
      }

      router.push("/admin/subcategories");
      router.refresh();
    } catch {
      setError("Algo deu errado. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <label className={styles.label} htmlFor="categoryId">
          Categoria
          <select
            id="categoryId"
            name="categoryId"
            className={styles.input}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={submitting}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.label} htmlFor="name">
          Nome
          <input
            id="name"
            name="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="displayOrder">
          Ordem de exibição
          <input
            id="displayOrder"
            name="displayOrder"
            type="number"
            className={styles.input}
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="status">
          Status
          <select
            id="status"
            name="status"
            className={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={submitting}
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </label>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancel}
          onClick={() => router.push("/admin/subcategories")}
          disabled={submitting}
        >
          Cancelar
        </button>
        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? "Salvando…" : "Salvar"}
        </button>
      </div>
    </form>
  );
}
