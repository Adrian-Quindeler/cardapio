import { NextResponse } from "next/server";

/**
 * TODO: Route Handler de produtos.
 * Responsabilidades:
 * - Receber a requisição
 * - Validar entrada com Zod (validations/products)
 * - Chamar o ProductService
 * - Retornar a resposta
 * Não deve conter regras de negócio nem acesso direto ao banco.
 */
export async function GET() {
  return NextResponse.json(
    { message: "TODO: Listar produtos via ProductService" },
    { status: 501 },
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "TODO: Criar produto via ProductService" },
    { status: 501 },
  );
}
