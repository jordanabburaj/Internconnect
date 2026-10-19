import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const CareerHub = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await API.get("/career-hub");
      setRoles(res.data);
    };
    fetchRoles();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Career Hub</h2>

      {roles.map((role) => (
        <div
          key={role._id}
          onClick={() => navigate(`/career-hub/${role._id}`)}
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            marginBottom: "12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <h3>{role.companyName}</h3>
          <p><b>Role:</b> {role.roleName}</p>
          <p><b>Level:</b> {role.experienceLevel}</p>
        </div>
      ))}
    </div>
  );
};

export default CareerHub;