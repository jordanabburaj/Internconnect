const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOtp,   // ✅ ADD THIS
} = require("../controllers/authController");

// AUTH ROUTES
router.post("/register", register);
router.post("/verify-otp", verifyOtp); // ✅ NOW DEFINED
router.post("/login", login);

module.exports = router;
