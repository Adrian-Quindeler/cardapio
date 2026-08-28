import { Suspense } from "react";
import { getStoreSettings } from "@/lib/home-data";
import LoginForm from "@/app/auth/login/LoginForm";
import styles from "./page.module.css";

/**
 * Página /auth/login.
 *
 * O Suspense existe porque LoginForm usa useSearchParams().
 * Enquanto os search params não estão prontos no client, o Next
 * mostra o fallback ("Carregando…") em vez de quebrar a renderização.
 */
export default async function LoginPage() {
	const storeSettings = await getStoreSettings();
	const brandName = storeSettings?.brandName ?? "Mamute";
	const logoUrl = storeSettings?.logoUrl ?? "/images/icone.png";

	return (
		<main className={styles.main}>
			<Suspense fallback={<p className={styles.loading}>Carregando…</p>}>
				<LoginForm logoUrl={logoUrl} brandName={brandName} />
			</Suspense>
		</main>
	);
}
