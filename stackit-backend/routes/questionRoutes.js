const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get all questions
router.get("/", async (req, res) => {
  const questions = await Question.find()
    .sort({ createdAt: -1 })
    .populate("author", "username");
  res.json(questions);
});

// Get a single question
router.get("/:id", async (req, res) => {
  const question = await Question.findById(req.params.id).populate("author", "username");
  if (!question) return res.status(404).json({ error: "Question not found" });
  res.json(question);
});


// Post a new question
router.post("/", async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const author = req.user?.id || null;
    const newQuestion = new Question({ title, description, tags, author });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: "Failed to post question" });
  }
});

module.exports = router;
