const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Question = require("../models/Question");

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.delete("/question/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;

