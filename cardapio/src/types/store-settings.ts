/**
 * Configuração de marca / hero da loja.
 */

export interface StoreSettings {
  id: string;
  brandName: string;
  logoUrl: string | null;
  logoPublicId: string | null;
  heroImageUrl: string | null;
  heroPublicId: string | null;
  heroAlt: string | null;
  updatedAt: Date;
}
