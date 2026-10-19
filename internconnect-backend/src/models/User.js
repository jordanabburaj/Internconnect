const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    otp: {
  type: String,
},
otpExpires: {
  type: Date,
},
isVerified: {
  type: Boolean,
  default: false,
},
certificates: [
  {
    title: String,
    file: String, // stored file path
  }
],


    // Student-only fields
    college: String,
    year: String,
    skills: [String],
    resume: String,

    // Recruiter-only fields
    companyName: String,
    companyDescription: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
