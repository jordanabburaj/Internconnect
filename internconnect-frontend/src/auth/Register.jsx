import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    year: "",
    skills: "",
    companyName: "",
    companyDescription: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const payload =
      role === "student"
        ? {
            name: form.name,
            email: form.email,
            password: form.password,
            role,
            college: form.college,
            year: form.year,
            skills: form.skills.split(","),
          }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            role,
            companyName: form.companyName,
            companyDescription: form.companyDescription,
          };

    const res = await API.post("/auth/register", payload);

    alert(res.data.message || "OTP sent to email");

    // ✅ Redirect to OTP verification
    navigate("/verify-otp", {
      state: { email: form.email },
    });
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};


  return (
    <div style={{ padding: "30px" }}>
      <h2>Register</h2>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <br /><br />

      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        {/* STUDENT FIELDS */}
        {role === "student" && (
          <>
            <input
              name="college"
              placeholder="College"
              value={form.college}
              onChange={handleChange}
              required
            />
            <br /><br />

            <input
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              required
            />
            <br /><br />

            <input
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
            />
            <br /><br />
          </>
        )}

        {/* RECRUITER FIELDS */}
        {role === "recruiter" && (
          <>
            <input
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              required
            />
            <br /><br />

            <textarea
              name="companyDescription"
              placeholder="Company Description"
              value={form.companyDescription}
              onChange={handleChange}
              required
            />
            <br /><br />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;