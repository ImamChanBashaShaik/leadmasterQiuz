const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, // array of options
  correctAnswer: { type: Number, required: true } // index (0-3)
});

module.exports = mongoose.model("Question", questionSchema);
