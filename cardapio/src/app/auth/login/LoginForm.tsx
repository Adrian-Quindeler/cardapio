"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import styles from "./page.module.css";

// Valida o parâmetro ?next= da URL (para onde ir depois do login).
function safeNextPath(value: string | null): string {
	if (!value || !value.startsWith("/") || value.startsWith("//")) {
		return "/admin";
	}
	return value;
}

interface LoginFormProps {
	logoUrl: string;
	brandName: string;
}

export default function LoginForm({ logoUrl, brandName }: LoginFormProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { session, isPending, login } = useAuth();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const nextPath = safeNextPath(searchParams.get("next"));

	// Se a pessoa já tem sessão ativa e chegou na tela de login, manda direto para o nextPath.
	useEffect(() => {
		if (!isPending && session) {
			router.replace(nextPath);
		}
	}, [isPending, session, router, nextPath]);


	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setSubmitting(true);

		try {
			const result = await login({
				username: username.trim(),
				password,
			});

			if (result.error) {
				const message = result.error.message ?? "";
				if (message === "Usuário inativo") {
					setError("Essa conta está inativa. Fale com o administrador.");
				} else if (/invalid origin/i.test(message)) {
					setError("Origem não autorizada. Verifique a URL de acesso.");
				} else {
					setError("Usuário ou senha incorretos");
				}
				return;
			}

			router.replace(nextPath);
		}
		catch {
			setError("Algo deu errado por aqui. Tenta outra vez em instantes.");
		}
		finally {
			setSubmitting(false);
		}
	}

	if (session) {
		return <p className={styles.loading}>Entrando no painel…</p>;
	}

	const busy = submitting || isPending;

	return (
		<div className={styles.shell}>
			<div className={styles.brandPane}>
				<Image
					src={logoUrl}
					width={220}
					height={220}
					alt={brandName}
					className={styles.logo}
					priority
				/>
			</div>

			<div className={styles.formPane}>
				<section className={styles.card}>
					<div className={styles.header}>
						<h1 className={styles.title}>Entrar no painel</h1>
						<p className={styles.subtitle}>Bem-vindo</p>
					</div>

					<form className={styles.form} onSubmit={handleSubmit} noValidate>
						<label className={styles.label} htmlFor="username">
							Usuário
							<input
								id="username"
								name="username"
								type="text"
								autoComplete="username"
								className={styles.input}
								value={username}
								onChange={(event) => setUsername(event.target.value)}
								required
								minLength={3}
								disabled={submitting}
							/>
						</label>

						<label className={styles.label} htmlFor="password">
							Senha
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								className={styles.input}
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								minLength={1}
								disabled={submitting}
							/>
						</label>

						{error ? <p className={styles.error}>{error}</p> : null}

						<button
							type="submit"
							className={styles.submit}
							// Botão off se estiver ocupado ou se faltar usuário/senha
							disabled={busy || !username.trim() || !password}
						>
							{submitting ? "Entrando…" : "Entrar"}
						</button>
					</form>
				</section>
			</div>
		</div>
	);
}
