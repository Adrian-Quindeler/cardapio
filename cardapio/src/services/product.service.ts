import { ProductRepository } from "@/repositories/product.repository";
import { ImageService } from "@/services/image.service";
import type { CreateProductInput, UpdateProductInput } from "@/validations/product.validation";

export class ProductServiceError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = "ProductServiceError";
  }
}

export class ProductService {
  constructor(
    private readonly repo = new ProductRepository(),
    private readonly imageService = new ImageService(),
  ) {}

  async findById(id: string) {
    return this.repo.findById(id);
  }

  async create(input: CreateProductInput) {
    const imagePublicId = input.imagePublicId ?? "";

    try {
      return await this.repo.create({
        name: input.name,
        description: input.description ?? "",
        subcategoryId: input.subcategoryId,
        retailPrice: input.retailPrice,
        wholesalePrice: input.wholesalePrice,
        wholesaleQuantity: input.wholesaleQuantity,
        imageUrl: input.imageUrl ?? "",
        imagePublicId,
        displayOrder: input.displayOrder,
        status: input.status,
      });
    } catch (error) {
      if (imagePublicId) {
        await this.imageService.delete(imagePublicId);
      }
      throw error;
    }
  }

  async update(id: string, input: UpdateProductInput) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new ProductServiceError("Produto não encontrado", 404);
    }

    const oldPublicId = existing.imagePublicId ?? "";
    const newPublicId = input.imagePublicId ?? "";
    const imageChanged = newPublicId !== oldPublicId;

    try {
      const updated = await this.repo.update(id, {
        name: input.name,
        description: input.description ?? "",
        subcategoryId: input.subcategoryId,
        retailPrice: input.retailPrice,
        wholesalePrice: input.wholesalePrice,
        wholesaleQuantity: input.wholesaleQuantity,
        imageUrl: input.imageUrl ?? "",
        imagePublicId: newPublicId,
        displayOrder: input.displayOrder,
        status: input.status,
      });

      if (imageChanged && oldPublicId) {
        await this.imageService.delete(oldPublicId);
      }

      return updated;
    } catch (error) {
      if (imageChanged && newPublicId) {
        await this.imageService.delete(newPublicId);
      }
      throw error;
    }
  }

  async delete(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new ProductServiceError("Produto não encontrado", 404);
    }

    const publicId = existing.imagePublicId ?? "";

    await this.repo.delete(id);

    if (publicId) {
      await this.imageService.delete(publicId);
    }
  }
}
