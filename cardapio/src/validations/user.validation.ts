import { z } from "zod";

const userRoleSchema = z.enum(["admin", "manager"]);
const userStatusSchema = z.enum(["active", "inactive"]);

const nameSchema = z.string().trim().min(1, "Nome é obrigatório");
const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("E-mail inválido"));
const usernameSchema = z
  .string()
  .trim()
  .min(3, "Usuário deve ter no mínimo 3 caracteres");
const displayUsernameSchema = z.string().trim().optional();

export const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  username: usernameSchema,
  displayUsername: displayUsernameSchema,
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: userRoleSchema,
  status: userStatusSchema,
});

export const updateUserSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    username: usernameSchema,
    displayUsername: displayUsernameSchema,
    password: z.string().optional(),
    role: userRoleSchema,
    status: userStatusSchema,
  })
  .refine((data) => !data.password || data.password.length >= 6, {
    message: "Senha deve ter no mínimo 6 caracteres",
    path: ["password"],
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
