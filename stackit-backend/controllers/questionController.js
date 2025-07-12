const Question = require("../models/Question");

exports.postQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  const question = new Question({
    title,
    description,
    tags,
    author: req.user.id
  });
  await question.save();
  res.status(201).json(question);
};

exports.getQuestions = async (req, res) => {
  const questions = await Question.find().populate("author", "username").sort({ createdAt: -1 });
  res.json(questions);
};
