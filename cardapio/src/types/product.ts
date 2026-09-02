/**
 * TODO: Tipos e DTOs de produtos.
 */

export type ProductStatus = "active" | "inactive";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  subcategoryId: string;
  retailPrice: number;
  wholesalePrice: number;
  wholesaleQuantity: number;
  imageUrl: string | null;
  imagePublicId: string | null;
  status: ProductStatus;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
