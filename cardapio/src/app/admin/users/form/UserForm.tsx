"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserRole, UserStatus } from "@/types/user";
import styles from "./page.module.css";

export type UserFormData = {
  id: string;
  name: string;
  email: string;
  username: string;
  displayUsername: string;
  role: UserRole;
  status: UserStatus;
};

type UserFormProps = {
  user: UserFormData | null;
};

export function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const isEdit = Boolean(user);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [displayUsername, setDisplayUsername] = useState(
    user?.displayUsername ?? "",
  );
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(user?.role ?? "manager");
  const [status, setStatus] = useState<UserStatus>(user?.status ?? "active");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload: Record<string, string> = {
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      displayUsername: displayUsername.trim(),
      role,
      status,
    };

    if (!isEdit || password) {
      payload.password = password;
    }

    try {
      const response = await fetch(
        isEdit ? `/api/users/${user?.id}` : "/api/users",
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
        setError(data?.message ?? "Não foi possível salvar o usuário.");
        return;
      }

      router.push("/admin/users");
      router.refresh();
    } catch {
      setError("Algo deu errado. Tente novamente em instantes.");
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
            onChange={(event) => setName(event.target.value)}
            required
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="email">
          E-mail
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="username">
          Usuário
          <input
            id="username"
            name="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            minLength={3}
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="displayUsername">
          Display
          <input
            id="displayUsername"
            name="displayUsername"
            type="text"
            className={styles.input}
            value={displayUsername}
            onChange={(event) => setDisplayUsername(event.target.value)}
            disabled={submitting}
          />
        </label>

        <label className={styles.label} htmlFor="password">
          Senha
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required={!isEdit}
            minLength={isEdit ? undefined : 6}
            disabled={submitting}
          />
          {isEdit ? (
            <span className={styles.hint}>
              Deixe em branco para manter a senha atual
            </span>
          ) : null}
        </label>

        <label className={styles.label} htmlFor="role">
          Papel
          <select
            id="role"
            name="role"
            className={styles.input}
            value={role}
            onChange={(event) => setRole(event.target.value as UserRole)}
            disabled={submitting}
          >
            <option value="admin">Administrador</option>
            <option value="manager">Gerente</option>
          </select>
        </label>

        <label className={styles.label} htmlFor="status">
          Status
          <select
            id="status"
            name="status"
            className={styles.input}
            value={status}
            onChange={(event) => setStatus(event.target.value as UserStatus)}
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
          onClick={() => router.push("/admin/users")}
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
