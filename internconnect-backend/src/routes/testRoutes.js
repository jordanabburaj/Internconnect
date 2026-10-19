const express = require("express");
const router = express.Router();
const {
  verifyToken,
  isStudent,
  isRecruiter,
} = require("../middleware/authMiddleware");

// Student-only test
router.get("/student", verifyToken, isStudent, (req, res) => {
  res.json({ message: "Student access granted", user: req.user });
});

// Recruiter-only test
router.get("/recruiter", verifyToken, isRecruiter, (req, res) => {
  res.json({ message: "Recruiter access granted", user: req.user });
});

module.exports = router;
