import express from "express";
const userRouter = express.Router();

import { register, login, checkUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/checkuser", authMiddleware, checkUser);
export default userRouter;
