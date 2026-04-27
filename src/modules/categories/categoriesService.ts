import { CreateCategoryDTO, UpdateCategoryDTO } from "./categoriesDTO";
import { Category } from "./categoriesModel";
import { CategoriesRepository } from "./categoriesRepository";

export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  async findById(id: number): Promise<Category | null> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    return this.categoriesRepository.findById(id);
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    this.validateCreateData(data);
    return this.categoriesRepository.create(data);
  }

  async update(id: number, data: UpdateCategoryDTO): Promise<Category> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    this.validateUpdateData(data);
    return this.categoriesRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    return this.categoriesRepository.delete(id);
  }

  private validateCreateData(data: CreateCategoryDTO): void {
    if (!data.nome || data.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório!");
    }
    if (data.nome.length > 100) {
      throw new Error("Nome não pode ter mais de 100 caracteres");
    }
  }

  private validateUpdateData(data: UpdateCategoryDTO): void {
    if (data.nome !== undefined) {
      if (data.nome.trim().length === 0) {
        throw new Error("Nome não pode estar vazio");
      }
      if (data.nome.length > 100) {
        throw new Error("Nome não pode ter mais de 100 caracteres");
      }
    }
  }
}