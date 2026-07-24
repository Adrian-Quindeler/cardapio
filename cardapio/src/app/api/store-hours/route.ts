import { NextResponse } from "next/server";

/**
 * TODO: Route Handler de horários de funcionamento.
 * Fluxo: validar entrada (Zod) → StoreHoursService → resposta.
 * Usado pela área pública para status aberta/fechada.
 */
export async function GET() {
  return NextResponse.json(
    { message: "TODO: Listar horários via StoreHoursService" },
    { status: 501 },
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: "TODO: Atualizar horários via StoreHoursService" },
    { status: 501 },
  );
}
