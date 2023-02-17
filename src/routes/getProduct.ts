import express from "express";

import ProductController from "../controllers/product.controller";

const router = express.Router();

router.get("/:id", ProductController.getProduct);

export { router as fetchProductRouter };
