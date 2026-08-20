import {
  ALLOWED_IMAGE_MIME_TYPES,
  isAllowedImageMimeType,
  isValidImageFolder,
  MAX_IMAGE_SIZE_BYTES,
  type ImageFolder,
} from "@/validations/image.validation";
import { deleteImage, uploadImage } from "@/services/storage/image-storage";

export class ImageServiceError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = "ImageServiceError";
  }
}

export type ImageUploadInput = {
  buffer: Buffer;
  mimeType: string;
  size: number;
  folder: string;
};

export type ImageUploadResult = {
  imageUrl: string;
  imagePublicId: string;
};

export class ImageService {
  async upload(input: ImageUploadInput): Promise<ImageUploadResult> {
    if (!input.buffer.length) {
      throw new ImageServiceError("Arquivo de imagem é obrigatório", 400);
    }

    if (!isAllowedImageMimeType(input.mimeType)) {
      throw new ImageServiceError("Formato de imagem não suportado", 400);
    }

    if (input.size > MAX_IMAGE_SIZE_BYTES) {
      throw new ImageServiceError("Imagem excede o tamanho máximo", 400);
    }

    if (!isValidImageFolder(input.folder)) {
      throw new ImageServiceError("Pasta de destino inválida", 400);
    }

    try {
      const uploaded = await uploadImage(input.buffer, {
        folder: input.folder as ImageFolder,
      });

      return {
        imageUrl: uploaded.url,
        imagePublicId: uploaded.publicId,
      };
    } catch {
      throw new ImageServiceError("Não foi possível enviar a imagem", 502);
    }
  }

  async delete(publicId: string): Promise<void> {
    if (!publicId) return;

    try {
      await deleteImage(publicId);
    } catch (error) {
      console.error("[ImageService] Falha ao excluir imagem da Cloudinary:", publicId, error);
    }
  }
}

export { ALLOWED_IMAGE_MIME_TYPES, MAX_IMAGE_SIZE_BYTES };
