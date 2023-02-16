import express from "express";

import { signinRouter } from "./signin";
import { signupRouter } from "./signup";
import { currentUserRouter } from "./currentUser";

const router = express.Router();

router.use("/users", signinRouter);
router.use("/users", signupRouter);
router.use("/users", currentUserRouter);

export default router;
