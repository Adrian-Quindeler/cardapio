import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { CategoryService, CategoryServiceError } from "@/services/category.service";
import { updateCategorySchema } from "@/validations/category.validation";

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

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await requireAuth();

    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateCategorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      );
    }

    const category = await new CategoryService().update(id, parsed.data);
    return NextResponse.json(category);
  } catch (error) {
    return errorResponse(error);
  }
}
