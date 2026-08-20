"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../admin-form.module.css";

export type StoreFormData = {
  brandName: string;
  logoUrl: string;
  logoPublicId: string;
  heroImageUrl: string;
  heroPublicId: string;
  heroAlt: string;
};

type StoreFormProps = {
  settings: StoreFormData | null;
};

type UploadResult = {
  imageUrl: string;
  imagePublicId: string;
};

async function uploadImageFile(file: File, folder: string): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/images", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json().catch(() => null)) as UploadResult & {
    message?: string;
  } | null;

  if (!response.ok || !data?.imageUrl || !data?.imagePublicId) {
    throw new Error(data?.message ?? "Não foi possível enviar a imagem.");
  }

  return { imageUrl: data.imageUrl, imagePublicId: data.imagePublicId };
}

export function StoreForm({ settings }: StoreFormProps) {
  const router = useRouter();

  const [brandName, setBrandName] = useState(settings?.brandName ?? "");
  const [logoUrl, setLogoUrl] = useState(settings?.logoUrl ?? "");
  const [logoPublicId, setLogoPublicId] = useState(settings?.logoPublicId ?? "");
  const [heroImageUrl, setHeroImageUrl] = useState(settings?.heroImageUrl ?? "");
  const [heroPublicId, setHeroPublicId] = useState(settings?.heroPublicId ?? "");
  const [heroAlt, setHeroAlt] = useState(settings?.heroAlt ?? "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings?.logoUrl || null);
  const [heroPreview, setHeroPreview] = useState<string | null>(settings?.heroImageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setLogoFile(file);
    if (file) setLogoPreview(URL.createObjectURL(file));
  }

  function handleHeroChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setHeroFile(file);
    if (file) setHeroPreview(URL.createObjectURL(file));
  }

  function handleRemoveLogo() {
    setLogoFile(null);
    setLogoUrl("");
    setLogoPublicId("");
    setLogoPreview(null);
  }

  function handleRemoveHero() {
    setHeroFile(null);
    setHeroImageUrl("");
    setHeroPublicId("");
    setHeroPreview(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      let finalLogoUrl = logoUrl;
      let finalLogoPublicId = logoPublicId;
      let finalHeroImageUrl = heroImageUrl;
      let finalHeroPublicId = heroPublicId;

      if (logoFile) {
        const uploaded = await uploadImageFile(logoFile, "cardapio/store/logo");
        finalLogoUrl = uploaded.imageUrl;
        finalLogoPublicId = uploaded.imagePublicId;
      }

      if (heroFile) {
        const uploaded = await uploadImageFile(heroFile, "cardapio/store/hero");
        finalHeroImageUrl = uploaded.imageUrl;
        finalHeroPublicId = uploaded.imagePublicId;
      }

      const response = await fetch("/api/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: brandName.trim(),
          logoUrl: finalLogoUrl.trim(),
          logoPublicId: finalLogoPublicId.trim(),
          heroImageUrl: finalHeroImageUrl.trim(),
          heroPublicId: finalHeroPublicId.trim(),
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
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Algo deu errado. Tente novamente em instantes.",
      );
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

        <div className={styles.label}>
          Logo
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={styles.input}
            onChange={handleLogoChange}
            disabled={submitting}
          />
          {logoPreview ? (
            <div style={{ marginTop: "0.75rem" }}>
              <Image
                src={logoPreview}
                alt="Pré-visualização do logo"
                width={120}
                height={120}
                unoptimized
                style={{ objectFit: "contain", borderRadius: "4px" }}
              />
              <button
                type="button"
                className={styles.cancel}
                onClick={handleRemoveLogo}
                disabled={submitting}
                style={{ marginTop: "0.5rem" }}
              >
                Remover logo
              </button>
            </div>
          ) : null}
        </div>

        <div className={styles.label}>
          Imagem hero
          <input
            id="heroImage"
            name="heroImage"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={styles.input}
            onChange={handleHeroChange}
            disabled={submitting}
          />
          {heroPreview ? (
            <div style={{ marginTop: "0.75rem" }}>
              <Image
                src={heroPreview}
                alt="Pré-visualização do hero"
                width={320}
                height={120}
                unoptimized
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
              <button
                type="button"
                className={styles.cancel}
                onClick={handleRemoveHero}
                disabled={submitting}
                style={{ marginTop: "0.5rem" }}
              >
                Remover imagem hero
              </button>
            </div>
          ) : null}
        </div>

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
