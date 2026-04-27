import { Handler } from "express";
import { CategoriesService } from "./categoriesService";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./categoriesDTO";

export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  findAll: Handler = async (req, res) => {
    try {
      const categories = await this.categoriesService.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  };

  findById: Handler = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await this.categoriesService.findById(Number(id));
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  };

  create: Handler = async (req, res) => {
    try {
      const createDTO: CreateCategoryDTO = req.body;
      const category = await this.categoriesService.create(createDTO);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao criar categoria" });
    }
  };

  update: Handler = async (req, res) => {
    try {
      const { id } = req.params;
      const updateDTO: UpdateCategoryDTO = req.body;
      const category = await this.categoriesService.update(Number(id), updateDTO);
      res.status(200).json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao atualizar categoria" });
    }
  };

  delete: Handler = async (req, res) => {
    try {
      const { id } = req.params;
      await this.categoriesService.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao deletar categoria" });
    }
  };
}