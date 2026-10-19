import React, { useEffect, useState } from "react";
import API from "../api/axios";
import RecruiterSidebar from "../components/RecruiterSidebar";

const RecruiterDashboard = () => {
  const [activeView, setActiveView] = useState("internships");
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    duration: "",
    stipend: "",
    location: "",
  });

  // ================= FETCH MY INTERNSHIPS =================
  const fetchInternships = async () => {
    try {
      const res = await API.get("/internships/my");
      setInternships(res.data.internships);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  // ================= FORM =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePostInternship = async (e) => {
    e.preventDefault();

    try {
      await API.post("/internships", {
        ...form,
        skillsRequired: form.skillsRequired.split(","),
      });

      alert("Internship posted successfully");
      setActiveView("internships");
      fetchInternships();
    } catch (error) {
      alert("Failed to post internship");
    }
  };

  // ================= VIEW APPLICANTS =================
  const viewApplicants = async (internship) => {
    try {
      const res = await API.get(`/internships/${internship._id}/applicants`);
      setApplications(res.data.applications);
      setSelectedInternship(internship);
      setShowApplicantsModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await API.patch(`/internships/applications/${applicationId}/status`, {
        status,
      });
      viewApplicants(selectedInternship);
    } catch (error) {
      console.error(error);
    }
  };

  const statusColor = {
    applied: "gray",
    shortlisted: "green",
    rejected: "red",
  };

  return (
    <>
      {/* SIDEBAR */}
      <RecruiterSidebar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: "240px", padding: "30px" }}>
        <h2>Recruiter Dashboard</h2>

        {/* ================= MY INTERNSHIPS ================= */}
        {activeView === "internships" && (
          <>
            <h3>My Internships</h3>

            {internships.length === 0 && <p>No internships posted yet</p>}

            {internships.map((internship) => (
              <div
                key={internship._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                }}
              >
                <h4>{internship.title}</h4>
                <p>{internship.location}</p>
                <button onClick={() => viewApplicants(internship)}>
                  View Applicants
                </button>
              </div>
            ))}
          </>
        )}

        {/* ================= POST INTERNSHIP ================= */}
        {activeView === "post" && (
          <>
            <h3>Post Internship</h3>

            <form onSubmit={handlePostInternship}>
              <input name="title" placeholder="Title" onChange={handleChange} required /><br /><br />
              <textarea name="description" placeholder="Description" onChange={handleChange} required /><br /><br />
              <input name="skillsRequired" placeholder="Skills (comma separated)" onChange={handleChange} /><br /><br />
              <input name="duration" placeholder="Duration" onChange={handleChange} /><br /><br />
              <input name="stipend" placeholder="Stipend" onChange={handleChange} /><br /><br />
              <input name="location" placeholder="Location" onChange={handleChange} /><br /><br />
              <button type="submit">Post Internship</button>
            </form>
          </>
        )}
      </div>

      {/* ================= APPLICANTS MODAL ================= */}
      {showApplicantsModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              width: "700px",
              maxHeight: "80vh",
              overflowY: "auto",
              padding: "25px",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowApplicantsModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
              }}
            >
              X
            </button>

            <h3>Applicants – {selectedInternship?.title}</h3>

            {applications.map((app) => (
              <div
                key={app._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                }}
              >
                <p><b>Name:</b> {app.student.name}</p>
                <p><b>Email:</b> {app.student.email}</p>
                <p><b>Skills:</b> {app.student.skills?.join(", ")}</p>

                <a
                  href={`http://localhost:5000/${app.resume}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>

                <br /><br />

                <span
                  style={{
                    backgroundColor: statusColor[app.status],
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {app.status.toUpperCase()}
                </span>

                <br /><br />

                <button onClick={() => updateStatus(app._id, "shortlisted")}>
                  Shortlist
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => updateStatus(app._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecruiterDashboard;
