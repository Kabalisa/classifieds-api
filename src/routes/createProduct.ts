import express from "express";
import { body, header } from "express-validator";

import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import ProductController from "../controllers/product.controller";

const router = express.Router();

router.post(
  "/create",
  [
    body("name")
      .isLength({ min: 1, max: 40 })
      .withMessage("name between 1 and 40 characters"),
    body("price").notEmpty().isNumeric().withMessage("a price is required"),
    body("description").notEmpty().withMessage("a description is required"),
    body("image").notEmpty().withMessage("an image url is required"),
    body("manufactureDate")
      .notEmpty()
      .withMessage("a manufacture date is required"),
    body("category").notEmpty().withMessage("a product category is required"),
    header("token").notEmpty().withMessage("the token is required"),
  ],
  validateRequest,
  currentUser,
  requireAuth,
  ProductController.createProduct
);

export { router as createProductRouter };
