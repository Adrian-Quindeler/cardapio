import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { account, user } from "../../drizzle/schema";
import type { User, UserRole, UserStatus } from "@/types/user";

type UserRow = typeof user.$inferSelect;

type CreateUserRecord = {
  id: string;
  name: string;
  email: string;
  username: string;
  displayUsername: string;
  role: UserRole;
  status: UserStatus;
  passwordHash: string;
};

type UpdateUserRecord = {
  name: string;
  email: string;
  username: string;
  displayUsername: string;
  role: UserRole;
  status: UserStatus;
  passwordHash?: string;
};

function toUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    username: row.username,
    displayUsername: row.displayUsername,
    role: row.role as UserRole,
    status: row.status as UserStatus,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    const [row] = await db.select().from(user).where(eq(user.id, id)).limit(1);
    return row ? toUser(row) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [row] = await db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .limit(1);
    return row ? toUser(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [row] = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);
    return row ? toUser(row) : null;
  }

  async create(data: CreateUserRecord): Promise<User> {
    const now = new Date();

    await db.insert(user).values({
      id: data.id,
      name: data.name,
      email: data.email,
      emailVerified: false,
      image: null,
      createdAt: now,
      updatedAt: now,
      username: data.username,
      displayUsername: data.displayUsername,
      role: data.role,
      status: data.status,
    });

    await db.insert(account).values({
      id: randomUUID(),
      accountId: data.id,
      providerId: "credential",
      userId: data.id,
      password: data.passwordHash,
      createdAt: now,
      updatedAt: now,
    });

    const created = await this.findById(data.id);
    if (!created) {
      throw new Error("Falha ao criar usuário");
    }
    return created;
  }

  async update(id: string, data: UpdateUserRecord): Promise<User> {
    const now = new Date();

    await db
      .update(user)
      .set({
        name: data.name,
        email: data.email,
        username: data.username,
        displayUsername: data.displayUsername,
        role: data.role,
        status: data.status,
        updatedAt: now,
      })
      .where(eq(user.id, id));

    if (data.passwordHash) {
      const [existingAccount] = await db
        .select({ id: account.id })
        .from(account)
        .where(and(eq(account.userId, id), eq(account.providerId, "credential")))
        .limit(1);

      if (existingAccount) {
        await db
          .update(account)
          .set({
            password: data.passwordHash,
            updatedAt: now,
          })
          .where(eq(account.id, existingAccount.id));
      } else {
        await db.insert(account).values({
          id: randomUUID(),
          accountId: id,
          providerId: "credential",
          userId: id,
          password: data.passwordHash,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error("Falha ao atualizar usuário");
    }
    return updated;
  }
}
