import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      setMessage(res.data.message);

      // redirect to login after success
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Email Verification</h2>
      <p>OTP sent to: <b>{email}</b></p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <br /><br />

      <button onClick={handleVerify}>Verify OTP</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;