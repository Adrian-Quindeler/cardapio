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
    console.log("[images] início");

    await requireAuth();
    console.log("[images] auth OK");

    const formData = await request.formData();
    console.log("[images] formData OK");

    const file = formData.get("file");
    const folder = formData.get("folder");

    console.log("[images] file:", {
      isFile: file instanceof File,
      name: file instanceof File ? file.name : null,
      type: file instanceof File ? file.type : null,
      size: file instanceof File ? file.size : null,
    });

    console.log("[images] folder:", folder);

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Arquivo de imagem é obrigatório" },
        { status: 400 }
      );
    }

    if (typeof folder !== "string" || !folder) {
      return NextResponse.json(
        { message: "Pasta de destino inválida" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    console.log("[images] buffer criado:", buffer.length);

    const mimeType = file.type || "application/octet-stream";

    console.log("[images] chamando ImageService");

    const result = await new ImageService().upload({
      buffer,
      mimeType,
      size: file.size,
      folder,
    });

    console.log("[images] upload OK:", result);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[images] ERRO:", error);

    return errorResponse(error);
  }
}

