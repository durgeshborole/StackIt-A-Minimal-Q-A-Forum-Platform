const Answer = require("../models/Answer");

exports.postAnswer = async (req, res) => {
  const answer = new Answer({
    text: req.body.text,
    question: req.params.questionId,
    author: req.user.id
  });
  await answer.save();
  res.status(201).json(answer);
};

exports.getAnswers = async (req, res) => {
  const answers = await Answer.find({ question: req.params.questionId }).populate("author", "username");
  res.json(answers);
};

exports.acceptAnswer = async (req, res) => {
  await Answer.updateMany({ question: req.body.questionId }, { accepted: false });
  await Answer.findByIdAndUpdate(req.params.answerId, { accepted: true });
  res.json({ message: "Answer accepted" });
};
