const jwt = require("jsonwebtoken");

// ================= VERIFY TOKEN (AUTHENTICATION) =================
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded data to request
    req.user = decoded; // { id, email, role }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ================= ONLY STUDENTS (AUTHORIZATION) =================
exports.isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res
      .status(403)
      .json({ message: "Access denied: Students only" });
  }
  next();
};

// ================= ONLY RECRUITERS (AUTHORIZATION) =================
exports.isRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res
      .status(403)
      .json({ message: "Access denied: Recruiters only" });
  }
  next();
};
