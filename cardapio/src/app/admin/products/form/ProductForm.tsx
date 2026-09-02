"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../../admin-form.module.css";

export type ProductFormData = {
	id: string;
	name: string;
	description: string;
	categoryId: string;
	subcategoryId: string;
	retailPrice: number;
	wholesalePrice: number;
	wholesaleQuantity: number;
	imageUrl: string;
	imagePublicId: string;
	displayOrder: number;
	status: string;
};

type SubcategoryOption = {
	id: string;
	categoryId: string;
	name: string;
};

type CategoryOption = {
	id: string;
	name: string;
};

type ProductFormProps = {
	product: ProductFormData | null;
	categories: CategoryOption[];
	subcategories: SubcategoryOption[];
};

type UploadResult = {
	imageUrl: string;
	imagePublicId: string;
};

async function uploadImageFile(file: File): Promise<UploadResult> {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("folder", "cardapio/products");

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

export function ProductForm({ product, categories, subcategories }: ProductFormProps) {
	const router = useRouter();
	const isEdit = Boolean(product);

	const [name, setName] = useState(product?.name ?? "");
	const [description, setDescription] = useState(product?.description ?? "");
	const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
	const [subcategoryId, setSubcategoryId] = useState(product?.subcategoryId ?? "");
	const [retailPrice, setRetailPrice] = useState(product?.retailPrice ?? 0);
	const [wholesalePrice, setWholesalePrice] = useState(product?.wholesalePrice ?? 0);
	const [wholesaleQuantity, setWholesaleQuantity] = useState(product?.wholesaleQuantity ?? 50);
	const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
	const [imagePublicId, setImagePublicId] = useState(product?.imagePublicId ?? "");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(product?.imageUrl || null);
	const [displayOrder, setDisplayOrder] = useState(product?.displayOrder ?? 0);
	const [status, setStatus] = useState(product?.status ?? "active");
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const filteredSubcategories = subcategories.filter(
		(subcategory) => subcategory.categoryId === categoryId,
	);

	function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0] ?? null;
		setImageFile(file);

		if (file) {
			setPreviewUrl(URL.createObjectURL(file));
		}
	}

	function handleRemoveImage() {
		setImageFile(null);
		setImageUrl("");
		setImagePublicId("");
		setPreviewUrl(null);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);

		if (!categoryId || !subcategoryId) {
			setError("Categoria e subcategoria são obrigatórias.");
			return;
		}

		setSubmitting(true);

		try {
			let finalImageUrl = imageUrl;
			let finalImagePublicId = imagePublicId;

			if (imageFile) {
				const uploaded = await uploadImageFile(imageFile);
				finalImageUrl = uploaded.imageUrl;
				finalImagePublicId = uploaded.imagePublicId;
			}

			const payload = {
				name: name.trim(),
				description: description.trim(),
				subcategoryId,
				retailPrice,
				wholesalePrice,
				wholesaleQuantity,
				imageUrl: finalImageUrl.trim(),
				imagePublicId: finalImagePublicId.trim(),
				displayOrder,
				status,
			};

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

				<label className={styles.label} htmlFor="categoryId">
					Categoria
					<select
						id="categoryId"
						name="categoryId"
						className={styles.input}
						value={categoryId}
						onChange={(e) => {
							setCategoryId(e.target.value);
							setSubcategoryId("");
						}}
						required
						disabled={submitting}
					>
						<option value="">Selecione uma categoria</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>{category.name}</option>
						))}
					</select>
				</label>

				<label className={styles.label} htmlFor="subcategoryId">
					Subcategoria
					<select
						id="subcategoryId"
						name="subcategoryId"
						className={styles.input}
						value={subcategoryId}
						onChange={(e) => setSubcategoryId(e.target.value)}
						required
						disabled={submitting || !categoryId}
					>
						<option value="">Selecione uma subcategoria</option>
						{filteredSubcategories.map((sub) => (
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

				<div className={styles.label}>
					Imagem
					<input
						id="image"
						name="image"
						type="file"
						accept="image/jpeg,image/png,image/webp"
						className={styles.input}
						onChange={handleImageChange}
						disabled={submitting}
					/>
					{previewUrl ? (
						<div style={{ marginTop: "0.75rem" }}>
							<Image
								src={previewUrl}
								alt="Pré-visualização"
								width={160}
								height={160}
								unoptimized
								style={{ objectFit: "cover", borderRadius: "4px" }}
							/>
							<button
								type="button"
								className={styles.cancel}
								onClick={handleRemoveImage}
								disabled={submitting}
								style={{ marginTop: "0.5rem" }}
							>
								Remover imagem
							</button>
						</div>
					) : null}
				</div>

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

				<label className={styles.label} htmlFor="wholesaleQuantity">
					Quantidade mínima atacado
					<input
						id="wholesaleQuantity"
						name="wholesaleQuantity"
						type="number"
						min={1}
						step={1}
						className={styles.input}
						value={wholesaleQuantity}
						onChange={(e) => setWholesaleQuantity(Number(e.target.value))}
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
