import { pool } from "../../database/database";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./categoriesDTO";
import { Category, CategoryModel } from "./categoriesModel";

export class CategoriesRepository {
  private mapToCategory(row: any): Category {
    return new CategoryModel(row.id, row.nome, row.criado_em);
  }

  public async findAll(): Promise<Category[]> {
    const result = await pool.query(`SELECT * FROM categorias ORDER BY criado_em DESC;`);
    return result.rows.map((row) => this.mapToCategory(row));
  }

  public async findById(id: number): Promise<Category | null> {
    const result = await pool.query(`SELECT * FROM categorias WHERE id = $1;`, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapToCategory(result.rows[0]);
  }

  public async create(data: CreateCategoryDTO): Promise<Category> {
    const result = await pool.query(
      `INSERT INTO categorias (nome) VALUES ($1) RETURNING *`,
      [data.nome]
    );
    return this.mapToCategory(result.rows[0]);
  }

  public async update(id: number, data: UpdateCategoryDTO): Promise<Category> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.nome !== undefined) {
      updates.push(`nome = $${paramIndex}`);
      values.push(data.nome);
      paramIndex++;
    }

    if (updates.length === 0) {
      throw new Error("Nenhum campo para atualizar");
    }

    values.push(id);
    const query = `UPDATE categorias SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Categoria não encontrada");
    }

    return this.mapToCategory(result.rows[0]);
  }

  public async delete(id: number): Promise<void> {
    const result = await pool.query(`DELETE FROM categorias WHERE id = $1;`, [id]);
    if (result.rowCount === 0) {
      throw new Error("Categoria não encontrada");
    }
  }
}