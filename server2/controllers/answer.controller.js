import Answer from "../models/Answer.models.js";
import Question from "../models/Questions.model.js";

export const getAnswers = async (req, res) => {
  const questionid = req.params.questionid;
  try {
    const answers = await Answer.find({ questionid })
      .populate("userid", "username email firstname lastname")
      .populate("questionid", "title description comment_count like_count")
      .sort({ createdAt: -1 });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createAnswer = async (req, res) => {
  const { answer } = req.body;
  const userid = req.user.userid;
  const questionid = req.params.questionid;
  if (!answer) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const newAnswer = await Answer.create({
      answer,
      userid,
      questionid,
    });
    const comment_count = await Answer.countDocuments({ questionid });

    const question = await Question.findByIdAndUpdate(questionid, {
      comment_count,
    });
    console.log(question);
    res.status(201).json({ newAnswer });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
