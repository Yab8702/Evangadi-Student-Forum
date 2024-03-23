import express from "express";
const answerRouter = express.Router();
import { getAnswers, createAnswer } from "../controllers/answer.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
answerRouter.get("/:questionid", authMiddleware, getAnswers);
answerRouter.post("/:questionid/create", authMiddleware, createAnswer);

export default answerRouter;
