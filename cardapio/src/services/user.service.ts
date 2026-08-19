import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { UserRepository } from "@/repositories/user.repository";
import type { CreateUserInput, UpdateUserInput } from "@/validations/user.validation";
import type { User } from "@/types/user";

export class UserServiceError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = "UserServiceError";
  }
}

export class UserService {
  constructor(private readonly users = new UserRepository()) {}

  async findById(id: string): Promise<User | null> {
    return this.users.findById(id);
  }

  async create(input: CreateUserInput): Promise<User> {
    const username = input.username.trim().toLowerCase();
    const email = input.email.trim().toLowerCase();
    const displayUsername =
      input.displayUsername?.trim() || input.username.trim();

    await this.assertUniqueUsername(username);
    await this.assertUniqueEmail(email);

    return this.users.create({
      id: randomUUID(),
      name: input.name.trim(),
      email,
      username,
      displayUsername,
      role: input.role,
      status: input.status,
      passwordHash: await hashPassword(input.password),
    });
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const existing = await this.users.findById(id);
    if (!existing) {
      throw new UserServiceError("Usuário não encontrado", 404);
    }

    const username = input.username.trim().toLowerCase();
    const email = input.email.trim().toLowerCase();
    const displayUsername =
      input.displayUsername?.trim() || input.username.trim();

    await this.assertUniqueUsername(username, id);
    await this.assertUniqueEmail(email, id);

    const password = input.password?.trim();

    return this.users.update(id, {
      name: input.name.trim(),
      email,
      username,
      displayUsername,
      role: input.role,
      status: input.status,
      passwordHash: password ? await hashPassword(password) : undefined,
    });
  }

  private async assertUniqueUsername(username: string, ignoreId?: string) {
    const found = await this.users.findByUsername(username);
    if (found && found.id !== ignoreId) {
      throw new UserServiceError(
        "Já existe um usuário com este nome de usuário",
        409,
      );
    }
  }

  private async assertUniqueEmail(email: string, ignoreId?: string) {
    const found = await this.users.findByEmail(email);
    if (found && found.id !== ignoreId) {
      throw new UserServiceError("Já existe um usuário com este e-mail", 409);
    }
  }
}
