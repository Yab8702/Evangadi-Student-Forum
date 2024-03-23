import express from "express";
const likeRouter = express.Router();

import { createQuestionLike } from "../controllers/like.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

likeRouter.post("/:questionid", authMiddleware, createQuestionLike);

export default likeRouter;
