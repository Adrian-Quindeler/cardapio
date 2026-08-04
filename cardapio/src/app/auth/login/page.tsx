// "use client" — este arquivo usa hooks (useState, useEffect, useSearchParams…).
// No App Router do Next, isso força a execução no browser, não só no servidor.
"use client";

import Image from "next/image";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import styles from "./page.module.css";

/**
 * Valida o parâmetro ?next= da URL (para onde ir depois do login).
 *
 * Por segurança, só aceita caminhos relativos que começam com "/"
 * e rejeita "//..." (open redirect para outro site, ex.: //evil.com).
 * Se o valor for inválido ou ausente, cai no padrão "/admin".
 */
function safeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin";
  }
  return value;
}

/**
 * Formulário de login em si.
 * Fica separado da página só por causa do Suspense: useSearchParams()
 * exige um boundary de Suspense no Next.js (senão a build reclama).
 */
function LoginForm() {
  // Navegação client-side (redirect após login / se já estiver logado)
  const router = useRouter();

  // Lê query string da URL, ex.: /auth/login?next=/admin
  const searchParams = useSearchParams();

  // session  → usuário logado (ou null)
  // isPending → ainda checando cookie/sessão no Better Auth
  // login    → authClient.signIn.username (envia usuário + senha)
  const { session, isPending, login } = useAuth();

  // Campos controlados do formulário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Mensagem de erro amigável para mostrar abaixo dos inputs
  const [error, setError] = useState<string | null>(null);
  // true enquanto a chamada de login está em andamento (UI do botão)
  const [submitting, setSubmitting] = useState(false);

  // Destino pós-login, já sanitizado
  const nextPath = safeNextPath(searchParams.get("next"));

  /**
   * Se a pessoa já tem sessão ativa e chegou na tela de login,
   * não faz sentido ficar aqui — manda direto para o nextPath.
   * Só roda quando isPending vira false (sessão já foi resolvida).
   */
  useEffect(() => {
    if (!isPending && session) {
      router.replace(nextPath);
    }
  }, [isPending, session, router, nextPath]);

  /**
   * Submit do formulário:
   * 1. Impede o reload padrão do browser (preventDefault)
   * 2. Limpa erro anterior e marca "enviando"
   * 3. Chama login do Better Auth com username/senha
   * 4. Se der erro de negócio → mensagem específica (inativo vs credenciais)
   * 5. Se ok → redireciona para nextPath
   * 6. Se explodir (rede etc.) → mensagem genérica
   * 7. finally sempre libera o botão
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const result = await login({
        // trim evita espaço acidental no usuário
        username: username.trim(),
        password,
      });

      if (result.error) {
        // O backend pode devolver "Usuário inativo"; o resto tratamos como
        // credenciais inválidas (sem revelar demais por segurança/UX).
        setError(
          result.error.message === "Usuário inativo"
            ? "Essa conta está inativa. Fale com o administrador."
            : "Usuário ou senha incorretos. Tenta de novo?",
        );
        return;
      }

      // Login ok: replace evita voltar para /auth/login com o botão "voltar"
      router.replace(nextPath);
    } catch {
      setError("Algo deu errado por aqui. Tenta outra vez em instantes.");
    } finally {
      setSubmitting(false);
    }
  }

  // Enquanto redireciona (já logado), mostra só um loading curto
  if (session) {
    return <p className={styles.loading}>Entrando no painel…</p>;
  }

  // Desabilita inputs/botão durante submit OU enquanto a sessão ainda carrega
  const busy = submitting || isPending;

  return (
    <>
      {/* Decorativo; aria-hidden para leitores de tela ignorarem */}
      <div className={styles.glow} aria-hidden="true" />

      <section className={styles.card}>
        <div className={styles.brand}>
          <Image
            src="/images/logo-mamute.png"
            alt="Mamute Loja da Fábrica"
            width={168}
            height={168}
            className={styles.logo}
            // priority: carrega a logo logo (acima da dobra / LCP)
            priority
          />
          <h1 className={styles.title}>Entrar no painel</h1>
          <p className={styles.subtitle}>
            Área da equipe Mamute — simples, rápida e geladinha.
          </p>
        </div>

        {/*
          noValidate: desliga o popup nativo do browser para podermos
          controlar a UX de erro nós mesmos (mensagens em português etc.).
        */}
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
              disabled={busy}
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
              disabled={busy}
            />
          </label>

          {/* Só renderiza o parágrafo de erro quando houver mensagem */}
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
    </>
  );
}

/**
 * Página /auth/login.
 *
 * O Suspense existe porque LoginForm usa useSearchParams().
 * Enquanto os search params não estão prontos no client, o Next
 * mostra o fallback ("Carregando…") em vez de quebrar a renderização.
 */
export default function LoginPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<p className={styles.loading}>Carregando…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
