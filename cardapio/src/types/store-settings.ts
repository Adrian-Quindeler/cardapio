/**
 * Configuração de marca / hero da loja.
 */

export interface StoreSettings {
  id: string;
  brandName: string;
  logoUrl: string | null;
  heroImageUrl: string | null;
  heroAlt: string | null;
  updatedAt: Date;
}
