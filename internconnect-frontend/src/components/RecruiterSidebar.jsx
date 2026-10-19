import React from "react";
import { useNavigate } from "react-router-dom";
import logout from "../utils/logout";

const RecruiterSidebar = ({ activeView, setActiveView }) => {
  const navigate = useNavigate();

  const itemStyle = (key) => ({
    padding: "12px",
    marginBottom: "8px",
    cursor: "pointer",
    borderRadius: "6px",
    backgroundColor: activeView === key ? "#2563eb" : "transparent",
    color: activeView === key ? "white" : "#111827",
  });

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        padding: "20px",
        borderRight: "1px solid #e5e7eb",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#f9fafb",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Recruiter Panel</h3>

      <div
        style={itemStyle("internships")}
        onClick={() => setActiveView("internships")}
      >
        📋 My Internships
      </div>

      <div
        style={itemStyle("post")}
        onClick={() => setActiveView("post")}
      >
        ➕ Post Internship
      </div>

      <div
        style={itemStyle("profile")}
        onClick={() => navigate("/profile")}
      >
        👤 Profile
      </div>

      <div
        style={{
          ...itemStyle("logout"),
          marginTop: "40px",
          color: "#ef4444",
        }}
        onClick={() => logout(navigate)}
      >
        🚪 Logout
      </div>
    </div>
  );
};

export default RecruiterSidebar;