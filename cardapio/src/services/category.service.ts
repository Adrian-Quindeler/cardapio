import { CategoryRepository } from "@/repositories/category.repository";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/validations/category.validation";

export class CategoryServiceError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = "CategoryServiceError";
  }
}

export class CategoryService {
  constructor(private readonly repo = new CategoryRepository()) {}

  async findById(id: string) {
    return this.repo.findById(id);
  }

  async create(input: CreateCategoryInput) {
    const slug = input.slug.toLowerCase();
    await this.assertUniqueSlug(slug);

    return this.repo.create({
      name: input.name,
      description: input.description ?? "",
      slug,
      displayOrder: input.displayOrder,
      status: input.status,
    });
  }

  async update(id: string, input: UpdateCategoryInput) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new CategoryServiceError("Categoria não encontrada", 404);
    }

    const slug = input.slug.toLowerCase();
    await this.assertUniqueSlug(slug, id);

    return this.repo.update(id, {
      name: input.name,
      description: input.description ?? "",
      slug,
      displayOrder: input.displayOrder,
      status: input.status,
    });
  }

  private async assertUniqueSlug(slug: string, ignoreId?: string) {
    const found = await this.repo.findBySlug(slug);
    if (found && found.id !== ignoreId) {
      throw new CategoryServiceError("Já existe uma categoria com este slug", 409);
    }
  }
}
