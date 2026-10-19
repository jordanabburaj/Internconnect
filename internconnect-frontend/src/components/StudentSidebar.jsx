import React from "react";
import { useNavigate } from "react-router-dom";
import logout from "../utils/logout";

const StudentSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const menuStyle = (name) => ({
    padding: "12px 16px",
    cursor: "pointer",
    backgroundColor: active === name ? "#2563eb" : "transparent",
    color: active === name ? "white" : "#111",
    borderRadius: "6px",
    marginBottom: "8px",
  });

  return (
    <div
      style={{
        width: "220px",
        padding: "20px",
        borderRight: "1px solid #ddd",
        height: "100vh",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>InternConnect</h3>

      <div
        style={menuStyle("available")}
        onClick={() => setActive("available")}
      >
        Available Internships
      </div>

      <div style={menuStyle("applied")} onClick={() => setActive("applied")}>
        Applied Internships
      </div>

      <div style={menuStyle("career")} onClick={() => navigate("/career-hub")}>
        Career Hub
      </div>

      <div style={menuStyle("profile")} onClick={() => navigate("/profile")}>
        Profile
      </div>

      <div
        style={{
          marginTop: "40px",
          color: "red",
          cursor: "pointer",
        }}
        onClick={() => logout(navigate)}
      >
        Logout
      </div>
    </div>
  );
};

export default StudentSidebar;