import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { CategoryService, CategoryServiceError } from "@/services/category.service";
import { createCategorySchema } from "@/validations/category.validation";

function errorResponse(error: unknown) {
  if (error instanceof CategoryServiceError) {
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
  return NextResponse.json({ message: "TODO: Listar categorias via CategoryService" }, { status: 501 });
}

export async function POST(request: Request) {
  try {
    await requireAuth();

    const body = await request.json();
    const parsed = createCategorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      );
    }

    const category = await new CategoryService().create(parsed.data);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
