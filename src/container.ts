import { CategoriesController } from "./modules/categories/categoriesController";
import { CategoriesRepository } from "./modules/categories/categoriesRepository";
import { CategoriesService } from "./modules/categories/categoriesService";
import { ProductController } from "./modules/product/productController";
import { ProductRepository } from "./modules/product/productRepository";
import { ProductService } from "./modules/product/productService";

export const categoriesRepository = new CategoriesRepository()
export const categoriesService = new CategoriesService(categoriesRepository)
export const categoriesController = new CategoriesController(categoriesService)

export const productRepository = new ProductRepository()
export const productService = new ProductService(productRepository)
export const productController = new ProductController(productService)
