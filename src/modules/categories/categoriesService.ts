import { CreateCategoryDTO } from "./categoriesDTO";
import { Category } from "./categoriesModel";
import { CategoriesRepository } from "./categoriesRepository";

export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll()
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    if(!data.nome) {
      throw new Error("Nome é obrigatório!")
    }

    return this.categoriesRepository.create(data)
  }
}