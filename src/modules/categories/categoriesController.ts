import { Handler } from "express";
import { CategoriesService } from "./categoriesService";

export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  findAll: Handler = async (req, res) => {
    const categories = await this.categoriesService.findAll()
    res.status(200).json(categories)
  }

  create: Handler = async (req, res) => {
    const category = await this.categoriesService.create(req.body)
    res.status(201).json(category)
  }
}