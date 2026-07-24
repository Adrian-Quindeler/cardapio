import { z } from "zod";

/**
 * TODO: Schemas Zod de usuários.
 */

export const createUserSchema = z.object({
  // TODO: name, username, password, role, status
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
