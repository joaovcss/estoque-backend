import { pool } from "../../database/database";
import { CreateProductDTO, UpdateProductDTO } from "./productDTO";
import { Product } from "./productModel";

export class ProductRepository {
  public async findAll(): Promise<Product[]> {
    const productList = await pool.query("SELECT (id, nome, preco_unitario) FROM produtos;")
    return productList.rows
  }

  public async findById(id: number): Promise<Product> {
    const product = await pool.query(
      `SELECT (id, nome, preco_unitario, quantidade_total AS estoque) 
      FROM produtos 
      WHERE id= $1;`,
      [id]
    )
    return product.rows[0]
  }

  public async create(data: CreateProductDTO): Promise<Product> {
    const newProduct = await pool.query(
      `INSERT INTO produtos
      (nome, descricao, preco_unitario, quantidade_total, estoque_minimo, categoria_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [data.nome, data.descricao, data.preco_unitario, data.quantidade_total, data.estoque_minimo, data.categoria_id]
    )
    return newProduct.rows[0]
  }

  public async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const updatedProduct = await pool.query(
      `UPDATE produtos 
      SET 
      nome = COALESCE($2, nome),
      descricao = COALESCE($3, descricao),
      preco_unitario = COALESCE($4::DECIMAL(10,2), preco_unitario),
      quantidade_total = COALESCE($5::INT, quantidade_total),
      estoque_minimo = COALESCE($6::INT, estoque_minimo),
      categoria_id = COALESCE($7::INT, categoria_id),
      atualizado_em = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING (nome, preco_unitario, quantidade_total)`,
      [id, data.nome, data.descricao, data.preco_unitario, data.quantidade_total, data.estoque_minimo, data.categoria_id]
    )
    return updatedProduct.rows[0]
  }

  public async delete(id: number): Promise<Product> {
    const deletedProduct = await pool.query(
      `DELETE FROM produtos WHERE id = $1 RETURNING *`, [id]
    )
    return deletedProduct.rows[0]
  }
}