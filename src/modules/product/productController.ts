import { Handler } from "express";
import { ProductService } from "./productService";

export class ProductController {
  constructor(private productService: ProductService) {}

  findAll: Handler = async (req, res) => {
    const products = await this.productService.findAll()
    res.status(200).json(products)
  }

  create: Handler = async (req, res) => {
    const product = await this.productService.create(req.body)
    res.status(201).json(product)
  }
} 
