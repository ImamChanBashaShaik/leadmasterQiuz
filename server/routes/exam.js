const express = require("express");
const Question = require("../models/Question");
const Submission = require("../models/Submission");
const authMiddleware = require("../middleware/authmiddleware");  // ✅ fixed
const router = express.Router();

// Get Random Questions
router.get("/questions", authMiddleware, async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Submit Exam
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;

    const questions = await Question.find({
      _id: { $in: answers.map(a => a.questionId) }
    });

    let score = 0;
    answers.forEach(ans => {
      const q = questions.find(q => q._id.toString() === ans.questionId);
      if (q && q.correctAnswer === ans.selectedOption) {
        score++;
      }
    });

    const submission = new Submission({
      userId: req.user.id,
      answers,
      score
    });

    await submission.save();

    res.json({ 
  message: "Exam submitted", 
  score, 
  submissionId: submission._id 
});

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get Result
router.get("/result/:id", authMiddleware, async (req, res) => {   // ✅ fixed
  try {
    const submission = await Submission.findById(req.params.id)
      .populate("userId", "name email");

    if (!submission) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
