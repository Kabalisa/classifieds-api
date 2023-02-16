import express from "express";

import { signinRouter } from "./signin";
import { signupRouter } from "./signup";

const router = express.Router();

router.use("/users", signinRouter);
router.use("/users", signupRouter);

export default router;
