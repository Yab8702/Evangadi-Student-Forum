import mongoose from "mongoose";
const { Schema, model } = mongoose;

const likeSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionid: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  { timestamps: true }
);

const Like = model("Like", likeSchema);
export default Like;
