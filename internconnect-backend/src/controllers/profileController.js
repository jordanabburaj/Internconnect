const User = require("../models/User");

// ================= GET MY PROFILE =================
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otp -otpExpires"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      profile: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE MY PROFILE =================
exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updates = {};

    // COMMON UPDATES
    if (req.body.skills) {
      updates.skills = req.body.skills.split(",");
    }

    if (req.body.college) updates.college = req.body.college;
    if (req.body.year) updates.year = req.body.year;
    if (req.body.companyDescription) {
      updates.companyDescription = req.body.companyDescription;
    }

    // CERTIFICATE UPLOAD
    if (req.file) {
      updates.$push = {
        certificates: {
          title: req.body.certificateTitle || "Certificate",
          file: req.file.path,
        },
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    ).select("-password -otp -otpExpires");

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
