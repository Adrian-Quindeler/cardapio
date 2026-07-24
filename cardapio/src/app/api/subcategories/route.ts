import { NextResponse } from "next/server";

/**
 * TODO: Route Handler de subcategorias.
 * Fluxo: validar entrada (Zod) → SubcategoryService → resposta.
 * Sem regras de negócio nem acesso ao banco nesta camada.
 */
export async function GET() {
  return NextResponse.json(
    { message: "TODO: Listar subcategorias via SubcategoryService" },
    { status: 501 },
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "TODO: Criar subcategoria via SubcategoryService" },
    { status: 501 },
  );
}
