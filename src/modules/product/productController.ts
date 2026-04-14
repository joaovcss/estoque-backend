import { Handler } from "express";
import { ProductService } from "./productService";

export class ProductController {
  constructor(private productService: ProductService) {}

  findAll: Handler = async (req, res) => {
    const products = await this.productService.findAll()
    res.status(200).json(products)
  }
} 
