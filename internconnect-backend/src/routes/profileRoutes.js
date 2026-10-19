const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/profileController");

const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../config/multer");

// GET logged-in user profile
router.get("/me", verifyToken, getMyProfile);

// UPDATE profile + certificate upload
router.put(
  "/update",
  verifyToken,
  upload.single("certificate"),
  updateMyProfile
);

module.exports = router;


