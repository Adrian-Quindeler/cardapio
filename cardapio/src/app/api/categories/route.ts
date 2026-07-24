import { NextResponse } from "next/server";

/**
 * TODO: Route Handler de categorias.
 * Fluxo: validar entrada (Zod) → CategoryService → resposta.
 * Sem regras de negócio nem acesso ao banco nesta camada.
 */
export async function GET() {
  return NextResponse.json(
    { message: "TODO: Listar categorias via CategoryService" },
    { status: 501 },
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "TODO: Criar categoria via CategoryService" },
    { status: 501 },
  );
}
