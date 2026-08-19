import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { ProductService, ProductServiceError } from "@/services/product.service";
import { createProductSchema } from "@/validations/product.validation";

function errorResponse(error: unknown) {
  if (error instanceof ProductServiceError) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode });
  }
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }
    if (error.message === "INACTIVE_USER") {
      return NextResponse.json({ message: "Usuário inativo" }, { status: 403 });
    }
  }
  return NextResponse.json({ message: "Não foi possível processar a requisição" }, { status: 500 });
}

export async function GET() {
  return NextResponse.json({ message: "TODO: Listar produtos via ProductService" }, { status: 501 });
}

export async function POST(request: Request) {
  try {
    await requireAuth();

    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      );
    }

    const product = await new ProductService().create(parsed.data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
