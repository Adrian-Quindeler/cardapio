/**
 * Tipos e DTOs de usuários.
 * Preparado para futuras funções/cargos e permissões avançadas.
 */

export type UserRole = "admin" | "manager";
export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string | null;
  displayUsername: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
