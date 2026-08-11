/**
 * TODO: Tipos e DTOs de categorias.
 */

export type CategoryStatus = "active" | "inactive";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  displayOrder: number;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}
