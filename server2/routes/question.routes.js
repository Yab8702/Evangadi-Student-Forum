import express from "express";
const questionRouter = express.Router();

import {
  getQuestions,
  createQuestion,
} from "../controllers/question.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
questionRouter.get("/", authMiddleware, getQuestions);
questionRouter.post("/create", authMiddleware, createQuestion);

export default questionRouter;
