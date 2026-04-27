import { Handler } from "express";
import { ProductService } from "./productService";
import { CreateProductDTO, UpdateProductDTO } from "./productDTO";

export class ProductController {
  constructor(private productService: ProductService) {}

  findAll: Handler = async (req, res) => {
    try {
      const products = await this.productService.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  };

  findById: Handler = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.productService.findById(Number(id));
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erro ao buscar produto" });
    }
  };

  create: Handler = async (req, res) => {
    try {
      const createDTO: CreateProductDTO = req.body;
      const product = await this.productService.create(createDTO);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao criar produto" });
    }
  };

  update: Handler = async (req, res) => {
    try {
      const { id } = req.params;
      const updateDTO: UpdateProductDTO = req.body;
      const product = await this.productService.update(Number(id), updateDTO);
      res.status(200).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao atualizar produto" });
    }
  };

  delete: Handler = async (req, res) => {
    try {
      const { id } = req.params;
      await this.productService.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao deletar produto" });
    }
  };
}
