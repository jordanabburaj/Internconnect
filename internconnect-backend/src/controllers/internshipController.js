const Internship = require("../models/Internship");
const Application = require("../models/Application");

// ================= RECRUITER: POST INTERNSHIP =================
exports.createInternship = async (req, res) => {
  try {
    const {
      title,
      description,
      skillsRequired,
      duration,
      stipend,
      location,
    } = req.body;

    const recruiterId = req.user.id;

    const internship = await Internship.create({
      title,
      description,
      skillsRequired,
      duration,
      stipend,
      location,
      postedBy: recruiterId,
    });

    res.status(201).json({
      message: "Internship posted successfully",
      internship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= STUDENT / PUBLIC: GET ALL INTERNSHIPS =================
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate(
      "postedBy",
      "name email"
    );

    res.status(200).json({
      internships,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= STUDENT: APPLY FOR INTERNSHIP =================
exports.applyForInternship = async (req, res) => {
  try {
    const studentId = req.user.id;
    const internshipId = req.params.internshipId;

    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required (PDF only)",
      });
    }

    const alreadyApplied = await Application.findOne({
      student: studentId,
      internship: internshipId,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "Already applied to this internship" });
    }

    const application = await Application.create({
      student: studentId,
      internship: internshipId,
      resume: req.file.path,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= RECRUITER: VIEW APPLICANTS =================
exports.getApplicantsForInternship = async (req, res) => {
  try {
    const internshipId = req.params.internshipId;

    const applications = await Application.find({
      internship: internshipId,
    }).populate("student", "name email college year skills");

    res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= RECRUITER: UPDATE APPLICATION STATUS =================
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    ).populate("student", "name email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= STUDENT: GET MY APPLICATIONS =================
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    })
      .populate("internship", "title location")
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= RECRUITER: GET MY INTERNSHIPS =================
exports.getMyInternships = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const internships = await Internship.find({
      postedBy: recruiterId,
    });

    res.status(200).json({ internships });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
