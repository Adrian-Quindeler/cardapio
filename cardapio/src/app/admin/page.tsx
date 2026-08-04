// "use client" é obrigatório no Next.js (App Router) quando o arquivo usa
// hooks do React (useState, useRouter, etc.) ou APIs só do browser.
// Sem isso, o Next tenta renderizar no servidor e esses hooks quebram.
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
// Hook nosso que encapsula o Better Auth (session, login, logout, etc.)
import { useAuth } from "@/hooks/use-auth";
import styles from "./page.module.css";

/**
 * Página do painel admin.
 * Por enquanto só confirma que o login/sessão funcionam:
 * mostra dados do usuário logado e permite sair.
 */
export default function AdminDashboardPage() {
  // Permite navegar entre rotas no client (ex.: ir para /auth/login após logout)
  const router = useRouter();

  // session  → dados do usuário logado (ou null se não houver sessão)
  // isPending → true enquanto o Better Auth ainda está checando o cookie/sessão
  // logout   → chama authClient.signOut e limpa a sessão no servidor/client
  const { session, isPending, logout } = useAuth();

  // Estado local só para a UI do botão "Sair" (evitar cliques duplos / feedback visual)
  const [signingOut, setSigningOut] = useState(false);

  /**
   * Fluxo de logout:
   * 1. Marca que estamos saindo (desabilita o botão)
   * 2. Pede ao Better Auth para encerrar a sessão
   * 3. Manda o usuário de volta para a tela de login
   * 4. Dá refresh para o Next revalidar dados/server components ligados à sessão
   * 5. No finally, libera o botão mesmo se algo falhar
   */
  async function handleLogout() {
    setSigningOut(true);
    try {
      await logout();
      // replace (em vez de push) evita que o usuário volte pro admin com o botão "voltar"
      router.replace("/auth/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  // Enquanto a sessão ainda está sendo carregada, não dá para decidir
  // se o usuário está logado ou não — mostra um placeholder.
  if (isPending) {
    return (
      <section className={styles.page}>
        <p className={styles.muted}>Carregando sessão…</p>
      </section>
    );
  }

  // Sessão já carregou, mas não há usuário autenticado.
  // (Em geral o middleware/layout já redireciona; isso é um fallback de UI.)
  if (!session) {
    return (
      <section className={styles.page}>
        <p className={styles.muted}>Nenhuma sessão ativa.</p>
      </section>
    );
  }

  // Nome amigável na saudação: prioriza name → username → email
  // (o primeiro valor "truthy" da esquerda pra direita é usado)
  const displayName =
    session.user.name || session.user.username || session.user.email;

  // A partir daqui temos sessão válida — renderiza o painel com os dados do usuário
  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <p className={styles.badge}>Você está dentro</p>
        <h1 className={styles.heading}>Olá, {displayName}!</h1>
        <p className={styles.muted}>
          Login e sessão funcionando. O painel completo vem nas próximas etapas.
        </p>

        {/* Lista de definição (dl/dt/dd) só para exibir metadados da sessão */}
        <dl className={styles.meta}>
          <div>
            <dt>Usuário</dt>
            {/* ?? "—" mostra um traço se username for null/undefined */}
            <dd>{session.user.username ?? "—"}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>{session.user.email}</dd>
          </div>
        </dl>

        <button
          type="button"
          className={styles.logout}
          onClick={handleLogout}
          // Enquanto o logout roda, o botão fica desabilitado
          disabled={signingOut}
        >
          {/* Texto do botão muda conforme o estado */}
          {signingOut ? "Saindo…" : "Sair"}
        </button>
      </div>
    </section>
  );
}
