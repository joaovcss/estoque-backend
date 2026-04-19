import { Router } from "express";
import { productController } from "../container";

const router = Router()

router.get("/produtos", productController.findAll)
router.post("/produtos", productController.create)

export { router }