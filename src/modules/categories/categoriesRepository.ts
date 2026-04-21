import { pool } from "../../database/database";
import { CreateCategoryDTO } from "./categoriesDTO";
import { Category } from "./categoriesModel";

export class CategoriesRepository {
  public async findAll(): Promise<Category[]> {
    const categories = await pool.query(`SELECT * FROM categorias;`)
    return categories.rows
  }

  public async create(data: CreateCategoryDTO): Promise<Category> {
    const category = await pool.query(
      `INSERT INTO categorias (nome) 
      VALUES 
      ($1) 
      RETURNING *`,
      [data.nome]
    )
    return category.rows[0]
  }
}