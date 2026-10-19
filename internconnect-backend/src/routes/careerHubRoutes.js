const express = require("express");
const router = express.Router();

const {
  getAllCareerRoles,
  getCareerRoleById,
} = require("../controllers/careerHubController");

const {
  verifyToken,
  isStudent,
} = require("../middleware/authMiddleware");

// STUDENT ONLY
router.get("/", verifyToken, isStudent, getAllCareerRoles);
router.get("/:id", verifyToken, isStudent, getCareerRoleById);

module.exports = router;
