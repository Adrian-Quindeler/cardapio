import { NextResponse } from "next/server";

/**
 * TODO: Route Handler de usuários.
 * Fluxo: validar entrada (Zod) → UserService → resposta.
 * Protegido por autenticação/autorização.
 */
export async function GET() {
  return NextResponse.json(
    { message: "TODO: Listar usuários via UserService" },
    { status: 501 },
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "TODO: Criar usuário via UserService" },
    { status: 501 },
  );
}
