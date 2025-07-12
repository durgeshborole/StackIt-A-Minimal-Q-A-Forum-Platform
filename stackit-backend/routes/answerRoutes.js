// routes/answerRoutes.js
const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const mongoose = require("mongoose");

// ✅ GET all answers for a question
router.get("/:questionId", async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId }).populate("author", "username");
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// // ✅ POST a new answer to a question
// router.get("/:questionId", async (req, res) => {
//   const { questionId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(questionId)) {
//     return res.status(400).json({ error: "Invalid question ID" });
//   }

//   try {
//     const answers = await Answer.find({ questionId }).populate("author", "username");
//     res.json(answers);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

router.post("/:questionId", async (req, res) => {
  console.log("🔽 Incoming Answer:", req.body);

  const { text, author } = req.body;
  const { questionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(400).json({ error: "Invalid question ID" });
  }

  try {
    const answer = await Answer.create({
      text,
      author,
      question: questionId,
    });
    res.status(201).json(answer);
  } catch (err) {
    console.error("❌ Failed to save answer:", err.message);
    res.status(500).json({ error: "Failed to submit answer" });
  }
});


// ✅ Accept an answer
router.put("/accept/:answerId", async (req, res) => {
  try {
    await Answer.updateMany(
      { questionId: req.body.questionId },
      { accepted: false }
    );
    const acceptedAnswer = await Answer.findByIdAndUpdate(
      req.params.answerId,
      { accepted: true },
      { new: true }
    );
    res.json(acceptedAnswer);
  } catch (err) {
    res.status(500).json({ error: "Failed to accept answer" });
  }
});




module.exports = router;
