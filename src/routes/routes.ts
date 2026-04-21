import { Router } from "express";
import { categoriesController, productController } from "../container";

const router = Router()

router.get("/categorias", categoriesController.findAll)
router.post("/categorias", categoriesController.create)

router.get("/produtos", productController.findAll)
router.post("/produtos", productController.create)
router.delete("/produtos/:id", productController.delete)
router.patch("/produtos/:id", productController.update)

export { router }