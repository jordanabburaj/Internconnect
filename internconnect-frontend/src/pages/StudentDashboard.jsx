import React, { useEffect, useState } from "react";
import API from "../api/axios";
import StudentSidebar from "../components/StudentSidebar";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resumeFiles, setResumeFiles] = useState({});
  const [applyMessage, setApplyMessage] = useState({});
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships();
    fetchMyApplications();
  }, []);

  // ================= FETCH DATA =================
  const fetchInternships = async () => {
    try {
      const res = await API.get("/internships");
      setInternships(res.data.internships);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const res = await API.get("/internships/my-applications");
      setApplications(res.data.applications || res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= HELPERS =================
  const getApplication = (internshipId) =>
    applications.find((a) => a.internship._id === internshipId);

  const availableInternships = internships.filter(
    (internship) => !getApplication(internship._id)
  );

  const statusColor = {
    applied: "gray",
    shortlisted: "green",
    rejected: "red",
  };

  // ================= APPLY =================
  const handleApply = async (internshipId) => {
    const resume = resumeFiles[internshipId];
    if (!resume) {
      setApplyMessage({
        ...applyMessage,
        [internshipId]: "Resume upload is mandatory",
      });
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const res = await API.post(
        `/internships/${internshipId}/apply`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setApplyMessage({
        ...applyMessage,
        [internshipId]: res.data.message,
      });

      fetchMyApplications();
    } catch (error) {
      setApplyMessage({
        ...applyMessage,
        [internshipId]:
          error.response?.data?.message || "Error applying",
      });
    }
  };

  if (loading) return <h3>Loading internships...</h3>;

  return (
    <div style={{ display: "flex" }}>
      {/* ================= SIDEBAR ================= */}
      <StudentSidebar active={activeTab} setActive={setActiveTab} />

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ flex: 1, padding: "30px" }}>
        {/* ===== AVAILABLE INTERNSHIPS ===== */}
        {activeTab === "available" && (
          <>
            <h2>Available Internships</h2>

            {availableInternships.length === 0 && (
              <p>No available internships</p>
            )}

            {availableInternships.map((internship) => (
              <div
                key={internship._id}
                onClick={() => setSelectedInternship(internship)}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  marginBottom: "12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                <h4>{internship.title}</h4>
                <p>{internship.description}</p>
                <p>
                  <strong>Location:</strong> {internship.location}
                </p>
              </div>
            ))}
          </>
        )}

        {/* ===== MY APPLICATIONS ===== */}
        {activeTab === "applied" && (
          <>
            <h2>My Applications</h2>

            {applications.length === 0 && (
              <p>You have not applied to any internships yet</p>
            )}

            {applications.map((app) => (
              <div
                key={app._id}
                style={{
                  border: "1px solid #aaa",
                  padding: "15px",
                  marginBottom: "12px",
                  borderRadius: "6px",
                }}
              >
                <h4>{app.internship.title}</h4>

                <span
                  style={{
                    backgroundColor: statusColor[app.status],
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                >
                  {app.status.toUpperCase()}
                </span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedInternship && (
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
              width: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
              padding: "25px",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedInternship(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              
            </button>

            <h3>{selectedInternship.title}</h3>
            <p>{selectedInternship.description}</p>

            <p><strong>Skills:</strong> {selectedInternship.skillsRequired?.join(", ")}</p>
            <p><strong>Duration:</strong> {selectedInternship.duration}</p>
            <p><strong>Stipend:</strong> {selectedInternship.stipend}</p>
            <p><strong>Location:</strong> {selectedInternship.location}</p>

            <hr />

            {!getApplication(selectedInternship._id) ? (
              <>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setResumeFiles({
                      ...resumeFiles,
                      [selectedInternship._id]: e.target.files[0],
                    })
                  }
                />
                <br /><br />
                <button onClick={() => handleApply(selectedInternship._id)}>
                  Apply with Resume
                </button>

                {applyMessage[selectedInternship._id] && (
                  <p style={{ marginTop: "8px", color: "blue" }}>
                    {applyMessage[selectedInternship._id]}
                  </p>
                )}
              </>
            ) : (
              <p style={{ color: "green", fontWeight: "bold" }}>
                Status: {getApplication(selectedInternship._id).status.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;