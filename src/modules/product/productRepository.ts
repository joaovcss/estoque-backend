import { pool } from "../../database/database";
import { CreateProductDTO, UpdateProductDTO } from "./productDTO";
import { Product, ProductModel } from "./productModel";

export class ProductRepository {
  private mapToProduct(row: any): Product {
    return new ProductModel(
      row.id,
      row.nome,
      row.descricao,
      row.preco_unitario,
      row.quantidade_total,
      row.estoque_minimo,
      row.categoria_id,
      row.criado_em,
      row.atualizado_em
    );
  }

  public async findAll(): Promise<Product[]> {
    const result = await pool.query(
      `SELECT id, nome, descricao, preco_unitario, quantidade_total, estoque_minimo, categoria_id, criado_em, atualizado_em 
       FROM produtos 
       ORDER BY atualizado_em DESC;`
    );
    return result.rows.map((row) => this.mapToProduct(row));
  }

  public async findById(id: number): Promise<Product | null> {
    const result = await pool.query(
      `SELECT id, nome, descricao, preco_unitario, quantidade_total, estoque_minimo, categoria_id, criado_em, atualizado_em 
       FROM produtos 
       WHERE id = $1;`,
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapToProduct(result.rows[0]);
  }

  public async create(data: CreateProductDTO): Promise<Product> {
    const result = await pool.query(
      `INSERT INTO produtos (nome, descricao, preco_unitario, quantidade_total, estoque_minimo, categoria_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.nome,
        data.descricao,
        data.preco_unitario,
        data.quantidade_total,
        data.estoque_minimo,
        data.categoria_id
      ]
    );
    return this.mapToProduct(result.rows[0]);
  }

  public async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.nome !== undefined) {
      updates.push(`nome = $${paramIndex}`);
      values.push(data.nome);
      paramIndex++;
    }

    if (data.descricao !== undefined) {
      updates.push(`descricao = $${paramIndex}`);
      values.push(data.descricao);
      paramIndex++;
    }

    if (data.preco_unitario !== undefined) {
      updates.push(`preco_unitario = $${paramIndex}::DECIMAL(10,2)`);
      values.push(data.preco_unitario);
      paramIndex++;
    }

    if (data.quantidade_total !== undefined) {
      updates.push(`quantidade_total = $${paramIndex}::INT`);
      values.push(data.quantidade_total);
      paramIndex++;
    }

    if (data.estoque_minimo !== undefined) {
      updates.push(`estoque_minimo = $${paramIndex}::INT`);
      values.push(data.estoque_minimo);
      paramIndex++;
    }

    if (data.categoria_id !== undefined) {
      updates.push(`categoria_id = $${paramIndex}::INT`);
      values.push(data.categoria_id);
      paramIndex++;
    }

    if (updates.length === 0) {
      throw new Error("Nenhum campo para atualizar");
    }

    updates.push(`atualizado_em = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `UPDATE produtos SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Produto não encontrado");
    }

    return this.mapToProduct(result.rows[0]);
  }

  public async delete(id: number): Promise<void> {
    const result = await pool.query(`DELETE FROM produtos WHERE id = $1;`, [id]);
    if (result.rowCount === 0) {
      throw new Error("Produto não encontrado");
    }
  }
}