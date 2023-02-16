import express from "express";

import { signinRouter } from "./signin";
import { signupRouter } from "./signup";
import { currentUserRouter } from "./currentUser";
import { createProductRouter } from "./createProduct";
import { fetchProductsRouter } from "./fetchProducts";

const router = express.Router();

router.use("/users", signinRouter);
router.use("/users", signupRouter);
router.use("/users", currentUserRouter);
router.use("/products", createProductRouter);
router.use("/products", fetchProductsRouter);

export default router;
