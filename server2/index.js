import express from "express";
import main from "./config/db.config.js";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import questionRouter from "./routes/question.routes.js";
import answerRouter from "./routes/answer.routes.js";
import likeRouter from "./routes/like.routes.js";
dotenv.config();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);
app.use("/api/likes", likeRouter);
main()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
