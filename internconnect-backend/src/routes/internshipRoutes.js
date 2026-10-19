const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  createInternship,
  getAllInternships,
  applyForInternship,
  getApplicantsForInternship,
  updateApplicationStatus,
  getMyApplications,
  getMyInternships,
} = require("../controllers/internshipController");

const {
  verifyToken,
  isRecruiter,
  isStudent,
} = require("../middleware/authMiddleware");

// Recruiter only
router.post("/", verifyToken, isRecruiter, createInternship);

// Student / Public
router.get("/", getAllInternships);


// STUDENT: My applications
router.get(
  "/my-applications",
  verifyToken,
  isStudent,
  getMyApplications
);

// Student only – apply
router.post(
  "/:internshipId/apply",
  verifyToken,
  isStudent,
  upload.single("resume"),
  applyForInternship
);
// Recruiter – view my internships only
router.get(
  "/my",
  verifyToken,
  isRecruiter,
  getMyInternships
);

// Recruiter only – view applicants
router.get(
  "/:internshipId/applicants",
  verifyToken,
  isRecruiter,
  getApplicantsForInternship
);

// Recruiter only – update application status
router.patch(
  "/applications/:applicationId/status",
  verifyToken,
  isRecruiter,
  updateApplicationStatus
);

module.exports = router;