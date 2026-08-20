import { NextResponse } from "next/server";
import { requireAuth } from "@/middleware/auth";
import { ImageService, ImageServiceError } from "@/services/image.service";

function errorResponse(error: unknown) {
  if (error instanceof ImageServiceError) {
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

export async function POST(request: Request) {
  try {
    await requireAuth();

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Arquivo de imagem é obrigatório" }, { status: 400 });
    }

    if (typeof folder !== "string" || !folder) {
      return NextResponse.json({ message: "Pasta de destino inválida" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || "application/octet-stream";

    const result = await new ImageService().upload({
      buffer,
      mimeType,
      size: file.size,
      folder,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
