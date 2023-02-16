import express from "express";

import ProductController from "../controllers/product.controller";

const router = express.Router();

router.get("/", ProductController.getProducts);

export { router as fetchProductsRouter };
