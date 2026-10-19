import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import logout from "../utils/logout";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [certificateTitle, setCertificateTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile/me");
      setProfile(res.data.profile);
      setSkills(res.data.profile.skills?.join(", "));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= UPDATE PROFILE =================
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("skills", skills);

    if (certificate) {
      formData.append("certificate", certificate);
      formData.append("certificateTitle", certificateTitle);
    }

    try {
      const res = await API.put("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      fetchProfile();
      setCertificate(null);
      setCertificateTitle("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  if (!profile) return <h3>Loading profile...</h3>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Profile</h2>

      {/* LOGOUT */}
      <button
        onClick={() => logout(navigate)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
        }}
      >
        Logout
      </button>

      <hr />

      {/* PROFILE INFO */}
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Role:</b> {profile.role}</p>

      {profile.role === "student" && (
        <>
          <p><b>College:</b> {profile.college}</p>
          <p><b>Year:</b> {profile.year}</p>
        </>
      )}

      {profile.role === "recruiter" && (
        <>
          <p><b>Company:</b> {profile.companyName}</p>
          <p><b>Description:</b> {profile.companyDescription}</p>
        </>
      )}

      <hr />

      {/* UPDATE FORM */}
      <h3>Update Profile</h3>

      <form onSubmit={handleUpdateProfile}>
        <label>Skills (comma separated)</label><br />
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={{ width: "300px" }}
        />
        <br /><br />

        <label>Upload Certificate (PDF)</label><br />
        <input
          type="text"
          placeholder="Certificate Title"
          value={certificateTitle}
          onChange={(e) => setCertificateTitle(e.target.value)}
        />
        <br /><br />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setCertificate(e.target.files[0])}
        />
        <br /><br />

        <button type="submit">Update Profile</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <hr />

      {/* CERTIFICATES */}
      <h3>My Certificates</h3>

      {profile.certificates?.length === 0 && <p>No certificates uploaded</p>}

      {profile.certificates?.map((cert, index) => (
        <div key={index}>
          <p>{cert.title}</p>
          <a
            href={`http://localhost:5000/${cert.file}`}
            target="_blank"
            rel="noreferrer"
          >
            View Certificate
          </a>
        </div>
      ))}
    </div>
  );
};

export default Profile;