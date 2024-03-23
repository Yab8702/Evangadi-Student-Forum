import mongoose from "mongoose";
const { Schema, model } = mongoose;

const answerSchema = new Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = model("Answer", answerSchema);

export default Answer;
