import Question from "../models/Questions.model.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("userid", "username email firstname lastname")
      .sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createQuestion = async (req, res) => {
  const { title, description } = req.body;
  const userid = req.user.userid;
  if (!title || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const question = await Question.create({
      title,
      description,
      userid,
    });
    res.status(201).json({ question });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
