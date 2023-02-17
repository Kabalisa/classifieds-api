import express from "express";

import { signinRouter } from "./signin";
import { signupRouter } from "./signup";
import { currentUserRouter } from "./currentUser";
import { createProductRouter } from "./createProduct";
import { fetchProductsRouter } from "./fetchProducts";
import { fetchProductRouter } from "./getProduct";

const router = express.Router();

router.use("/users", signinRouter);
router.use("/users", signupRouter);
router.use("/users", currentUserRouter);
router.use("/products", createProductRouter);
router.use("/products", fetchProductsRouter);
router.use("/products", fetchProductRouter);

export default router;
