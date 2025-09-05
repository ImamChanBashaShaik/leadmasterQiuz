const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");

// Example protected route
router.get("/profile", authmiddleware, (req, res) => {
  res.json({ message: "This is a protected profile route", user: req.user });
});

module.exports = router;
