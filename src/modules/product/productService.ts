import { CreateProductDTO } from "./productDTO";
import { Product } from "./productModel";
import { ProductRepository } from "./productRepository";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll()
   }

  async findById(id: number): Promise<Product> {
    return this.productRepository.findById(id)
  }

  async create(data: CreateProductDTO): Promise<Product> {
    if(!data.nome) {
      throw new Error("Nome é obrigatório!")
    }

    return this.productRepository.create(data)
  }

  async delete(id: number): Promise<Product> {
    return this.productRepository.delete(id)
  }
}