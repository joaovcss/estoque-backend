import { CreateProductDTO, UpdateProductDTO } from "./productDTO";
import { Product } from "./productModel";
import { ProductRepository } from "./productRepository";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findById(id: number): Promise<Product | null> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    return this.productRepository.findById(id);
  }

  async create(data: CreateProductDTO): Promise<Product> {
    this.validateCreateData(data);
    return this.productRepository.create(data);
  }

  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    this.validateUpdateData(data);
    return this.productRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error("ID inválido");
    }
    return this.productRepository.delete(id);
  }

  private validateCreateData(data: CreateProductDTO): void {
    if (!data.nome || data.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório!");
    }
    if (data.nome.length > 100) {
      throw new Error("Nome não pode ter mais de 100 caracteres");
    }

    if (!data.descricao || data.descricao.trim().length === 0) {
      throw new Error("Descrição é obrigatória!");
    }
    if (data.descricao.length > 500) {
      throw new Error("Descrição não pode ter mais de 500 caracteres");
    }

    if (!data.preco_unitario) {
      throw new Error("Preço unitário é obrigatório!");
    }

    if (!data.quantidade_total) {
      throw new Error("Quantidade total é obrigatória!");
    }
    const qtd = Number(data.quantidade_total);
    if (isNaN(qtd) || qtd < 0) {
      throw new Error("Quantidade total deve ser um número não negativo");
    }

    if (!data.estoque_minimo) {
      throw new Error("Estoque mínimo é obrigatório!");
    }
    const minQtd = Number(data.estoque_minimo);
    if (isNaN(minQtd) || minQtd < 0) {
      throw new Error("Estoque mínimo deve ser um número não negativo");
    }

    if (!data.categoria_id || data.categoria_id <= 0) {
      throw new Error("Categoria inválida!");
    }
  }

  private validateUpdateData(data: UpdateProductDTO): void {
    if (data.nome !== undefined) {
      if (data.nome.trim().length === 0) {
        throw new Error("Nome não pode estar vazio");
      }
      if (data.nome.length > 100) {
        throw new Error("Nome não pode ter mais de 100 caracteres");
      }
    }

    if (data.descricao !== undefined) {
      if (data.descricao.trim().length === 0) {
        throw new Error("Descrição não pode estar vazia");
      }
      if (data.descricao.length > 500) {
        throw new Error("Descrição não pode ter mais de 500 caracteres");
      }
    }

    if (data.quantidade_total !== undefined) {
      const qtd = Number(data.quantidade_total);
      if (isNaN(qtd) || qtd < 0) {
        throw new Error("Quantidade total deve ser um número não negativo");
      }
    }

    if (data.estoque_minimo !== undefined) {
      const minQtd = Number(data.estoque_minimo);
      if (isNaN(minQtd) || minQtd < 0) {
        throw new Error("Estoque mínimo deve ser um número não negativo");
      }
    }

    if (data.categoria_id !== undefined && data.categoria_id <= 0) {
      throw new Error("Categoria inválida!");
    }
  }
}