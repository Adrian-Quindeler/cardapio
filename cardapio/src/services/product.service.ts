import { ProductRepository } from "@/repositories/product.repository";
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
  constructor(private readonly repo = new ProductRepository()) {}

  async findById(id: string) {
    return this.repo.findById(id);
  }

  async create(input: CreateProductInput) {
    return this.repo.create({
      name: input.name,
      description: input.description ?? "",
      subcategoryId: input.subcategoryId,
      retailPrice: input.retailPrice,
      wholesalePrice: input.wholesalePrice,
      imageUrl: input.imageUrl ?? "",
      displayOrder: input.displayOrder,
      status: input.status,
    });
  }

  async update(id: string, input: UpdateProductInput) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new ProductServiceError("Produto não encontrado", 404);
    }

    return this.repo.update(id, {
      name: input.name,
      description: input.description ?? "",
      subcategoryId: input.subcategoryId,
      retailPrice: input.retailPrice,
      wholesalePrice: input.wholesalePrice,
      imageUrl: input.imageUrl ?? "",
      displayOrder: input.displayOrder,
      status: input.status,
    });
  }
}
