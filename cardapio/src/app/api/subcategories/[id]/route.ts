import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { SubcategoryService, SubcategoryServiceError } from "@/services/subcategory.service";
import { updateSubcategorySchema } from "@/validations/subcategory.validation";

function errorResponse(error: unknown) {
  if (error instanceof SubcategoryServiceError) {
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
    const parsed = updateSubcategorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      );
    }

    const subcategory = await new SubcategoryService().update(id, parsed.data);
    return NextResponse.json(subcategory);
  } catch (error) {
    return errorResponse(error);
  }
}
