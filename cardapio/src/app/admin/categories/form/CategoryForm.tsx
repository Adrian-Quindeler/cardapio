"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../admin-form.module.css";

export type CategoryFormData = {
  id: string;
  name: string;
  description: string;
  slug: string;
  displayOrder: number;
  status: string;
};

type CategoryFormProps = {
  category: CategoryFormData | null;
};

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const isEdit = Boolean(category);

  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [displayOrder, setDisplayOrder] = useState(category?.displayOrder ?? 0);
  const [status, setStatus] = useState(category?.status ?? "active");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      slug: slug.trim(),
      displayOrder,
      status,
    };

    try {
      const response = await fetch(
        isEdit ? `/api/categories/${category?.id}` : "/api/categories",
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
        setError(data?.message ?? "Não foi possível salvar a categoria.");
        return;
      }

      router.push("/admin/categories");
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

        <label className={styles.label} htmlFor="slug">
          Slug
          <input
            id="slug"
            name="slug"
            type="text"
            className={styles.input}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="description">
          Descrição
          <input
            id="description"
            name="description"
            type="text"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          onClick={() => router.push("/admin/categories")}
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
