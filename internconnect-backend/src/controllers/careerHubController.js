const CareerRole = require("../models/CareerRole");

// ================= GET ALL CAREER ROLES =================
exports.getAllCareerRoles = async (req, res) => {
  try {
    const roles = await CareerRole.find().select(
      "companyName roleName experienceLevel"
    );

    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET CAREER ROLE BY ID =================
exports.getCareerRoleById = async (req, res) => {
  try {
    const role = await CareerRole.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Career role not found" });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
