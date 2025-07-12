const mongoose = require("mongoose");
const answerSchema = new mongoose.Schema({
  text: String,
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  accepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
 

});
module.exports = mongoose.model("Answer", answerSchema);
