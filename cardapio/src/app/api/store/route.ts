import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { StoreSettingsService } from "@/services/store-settings.service";
import { updateStoreSettingsSchema } from "@/validations/store-settings.validation";

const service = new StoreSettingsService();

export async function GET() {
  try {
    const settings = await service.get();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { message: "Não foi possível carregar as configurações" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    await requireAuth();

    const body = await request.json();
    const parsed = updateStoreSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Dados inválidos" },
        { status: 400 },
      );
    }

    const settings = await service.upsert(parsed.data);
    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
      }
      if (error.message === "INACTIVE_USER") {
        return NextResponse.json({ message: "Usuário inativo" }, { status: 403 });
      }
    }

    return NextResponse.json(
      { message: "Não foi possível salvar as configurações" },
      { status: 500 },
    );
  }
}
