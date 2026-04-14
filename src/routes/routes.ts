import { Router } from "express";
import { productController } from "../container";

const router = Router()

router.get("/produtos", productController.findAll)

export { router }