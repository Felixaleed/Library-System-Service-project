import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client"); // Default to 'client'
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        email,
        password,
        confirmPassword,
        role: "admin", // Set the role explicitly
      });
  
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="redirect-message">
          Already have an account?{" "}
          <button className="login-redirect-button" onClick={handleLoginRedirect}>
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
