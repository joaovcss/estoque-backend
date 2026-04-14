import { ProductController } from "./modules/product/productController";
import { ProductRepository } from "./modules/product/productRepository";
import { ProductService } from "./modules/product/productService";

export const productRepository = new ProductRepository()

export const productService = new ProductService(productRepository)

export const productController = new ProductController(productService)
