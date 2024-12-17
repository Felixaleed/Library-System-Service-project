import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to the login page
import "./SignUpPage.css"; // Make sure to create the corresponding CSS file

const SignUpPage = () => {
  // State to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // Hook to navigate between pages

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (validation, API call, etc.)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Registration successful!");
      // Optionally, navigate to login page after successful registration
      navigate("/login");
    }
  };

  const handleLoginRedirect = () => {
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
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

          <button type="submit" className="register-button">
            Register
          </button>

          {/* Text prompt and Login Button */}
          <div className="login-redirect">
            <p>
              If you already have an account,{" "}
              <button type="button" onClick={handleLoginRedirect} className="login-button">
                Log in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
