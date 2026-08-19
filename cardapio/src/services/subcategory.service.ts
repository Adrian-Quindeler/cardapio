import { SubcategoryRepository } from "@/repositories/subcategory.repository";
import type { CreateSubcategoryInput, UpdateSubcategoryInput } from "@/validations/subcategory.validation";

export class SubcategoryServiceError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = "SubcategoryServiceError";
  }
}

export class SubcategoryService {
  constructor(private readonly repo = new SubcategoryRepository()) {}

  async findById(id: string) {
    return this.repo.findById(id);
  }

  async create(input: CreateSubcategoryInput) {
    return this.repo.create({
      categoryId: input.categoryId,
      name: input.name,
      displayOrder: input.displayOrder,
      status: input.status,
    });
  }

  async update(id: string, input: UpdateSubcategoryInput) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new SubcategoryServiceError("Subcategoria não encontrada", 404);
    }

    return this.repo.update(id, {
      categoryId: input.categoryId,
      name: input.name,
      displayOrder: input.displayOrder,
      status: input.status,
    });
  }
}
