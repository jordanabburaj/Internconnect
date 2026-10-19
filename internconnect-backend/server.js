const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
// const testRoutes = require("./src/routes/testRoutes");
const internshipRoutes = require("./src/routes/internshipRoutes");

// Career Hub Routes
const careerHubRoutes = require("./src/routes/careerHubRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

//career hub routes end

const app = express();


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


/* 🔐 ROUTES */
app.use("/api/auth", authRoutes);
// app.use("/api/tests", testRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/career-hub", careerHubRoutes);
app.use("/api/profile", profileRoutes);


app.get("/", (req, res) => {
  res.send("InternConnect API running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


