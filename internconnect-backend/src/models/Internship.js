const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    skillsRequired: {
      type: [String],
    },

    duration: {
      type: String, // e.g., "3 months"
    },

    stipend: {
      type: String, // e.g., "5000 / Zero Stipend"
    },

    location: {
      type: String, // Remote / Chennai / Hybrid
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);
