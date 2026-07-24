/**
 * TODO: Tipos e DTOs de horários de funcionamento.
 * dayOfWeek: 0 = Domingo, 1 = Segunda, ..., 6 = Sábado.
 */

export interface StoreHours {
  id: string;
  dayOfWeek: number;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
}

export interface StoreStatus {
  isOpen: boolean;
  todayHours: StoreHours | null;
}
