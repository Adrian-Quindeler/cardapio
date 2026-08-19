"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../admin-form.module.css";

export type ProductFormData = {
  id: string;
  name: string;
  description: string;
  subcategoryId: string;
  retailPrice: number;
  wholesalePrice: number;
  imageUrl: string;
  displayOrder: number;
  status: string;
};

type SubcategoryOption = {
  id: string;
  name: string;
};

type ProductFormProps = {
  product: ProductFormData | null;
  subcategories: SubcategoryOption[];
};

export function ProductForm({ product, subcategories }: ProductFormProps) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [subcategoryId, setSubcategoryId] = useState(product?.subcategoryId ?? (subcategories[0]?.id ?? ""));
  const [retailPrice, setRetailPrice] = useState(product?.retailPrice ?? 0);
  const [wholesalePrice, setWholesalePrice] = useState(product?.wholesalePrice ?? 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [displayOrder, setDisplayOrder] = useState(product?.displayOrder ?? 0);
  const [status, setStatus] = useState(product?.status ?? "active");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      subcategoryId,
      retailPrice,
      wholesalePrice,
      imageUrl: imageUrl.trim(),
      displayOrder,
      status,
    };

    try {
      const response = await fetch(
        isEdit ? `/api/products/${product?.id}` : "/api/products",
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
        setError(data?.message ?? "Não foi possível salvar o produto.");
        return;
      }

      router.push("/admin/products");
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

        <label className={styles.label} htmlFor="subcategoryId">
          Subcategoria
          <select
            id="subcategoryId"
            name="subcategoryId"
            className={styles.input}
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            disabled={submitting}
          >
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
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

        <label className={styles.label} htmlFor="imageUrl">
          URL da imagem
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            className={styles.input}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="retailPrice">
          Preço varejo
          <input
            id="retailPrice"
            name="retailPrice"
            type="number"
            step="0.01"
            className={styles.input}
            value={retailPrice}
            onChange={(e) => setRetailPrice(Number(e.target.value))}
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="wholesalePrice">
          Preço atacado
          <input
            id="wholesalePrice"
            name="wholesalePrice"
            type="number"
            step="0.01"
            className={styles.input}
            value={wholesalePrice}
            onChange={(e) => setWholesalePrice(Number(e.target.value))}
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
          onClick={() => router.push("/admin/products")}
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
