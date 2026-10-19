const mongoose = require("mongoose");

const recommendedCourseSchema = new mongoose.Schema({
  title: String,
  platform: String,
  duration: String,
  link: String,
});

const careerRoleSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    roleName: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    recommendedCourses: {
      type: [recommendedCourseSchema],
      default: [],
    },
    careerPageLink: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Intern", "Fresher"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerRole", careerRoleSchema);
