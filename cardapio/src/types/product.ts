/**
 * TODO: Tipos e DTOs de produtos.
 */

export type ProductStatus = "active" | "inactive";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  subcategoryId: string;
  retailPrice: number;
  wholesalePrice: number;
  imageUrl: string | null;
  status: ProductStatus;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
