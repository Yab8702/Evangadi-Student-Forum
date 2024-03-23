import Like from "../models/Like.models.js";
import Question from "../models/Questions.model.js";

export const createQuestionLike = async (req, res) => {
  const userid = req.user.userid;
  const questionid = req.params.questionid;
  try {
    const like = await Like.findOne({ userid, questionid });
    if (like) {
      return res.status(400).json({ msg: "Question already liked" });
    }
    await Like.create({ userid, questionid });
    const like_count = await Like.countDocuments({ questionid });
    const question = await Question.findByIdAndUpdate(questionid, {
      like_count,
    });
    res.status(201).json({ msg: "Question liked" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
