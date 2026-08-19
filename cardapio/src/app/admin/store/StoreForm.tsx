"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin-form.module.css";

export type StoreFormData = {
  brandName: string;
  logoUrl: string;
  heroImageUrl: string;
  heroAlt: string;
};

type StoreFormProps = {
  settings: StoreFormData | null;
};

export function StoreForm({ settings }: StoreFormProps) {
  const router = useRouter();

  const [brandName, setBrandName] = useState(settings?.brandName ?? "");
  const [logoUrl, setLogoUrl] = useState(settings?.logoUrl ?? "");
  const [heroImageUrl, setHeroImageUrl] = useState(settings?.heroImageUrl ?? "");
  const [heroAlt, setHeroAlt] = useState(settings?.heroAlt ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: brandName.trim(),
          logoUrl: logoUrl.trim(),
          heroImageUrl: heroImageUrl.trim(),
          heroAlt: heroAlt.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setError(data?.message ?? "Não foi possível salvar as configurações.");
        return;
      }

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
        <label className={styles.label} htmlFor="brandName">
          Nome da marca
          <input
            id="brandName"
            name="brandName"
            type="text"
            className={styles.input}
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="logoUrl">
          URL do logo
          <input
            id="logoUrl"
            name="logoUrl"
            type="text"
            className={styles.input}
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="heroImageUrl">
          URL da imagem hero
          <input
            id="heroImageUrl"
            name="heroImageUrl"
            type="text"
            className={styles.input}
            value={heroImageUrl}
            onChange={(e) => setHeroImageUrl(e.target.value)}
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="heroAlt">
          Alt da imagem hero
          <input
            id="heroAlt"
            name="heroAlt"
            type="text"
            className={styles.input}
            value={heroAlt}
            onChange={(e) => setHeroAlt(e.target.value)}
            disabled={submitting}
          />
        </label>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancel}
          onClick={() => router.push("/admin")}
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
