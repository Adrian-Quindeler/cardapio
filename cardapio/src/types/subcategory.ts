/**
 * TODO: Tipos e DTOs de subcategorias.
 */

export type SubcategoryStatus = "active" | "inactive";

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  displayOrder: number;
  status: SubcategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}
