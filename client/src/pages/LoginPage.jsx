import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to the sign-up page
import "./LoginPage.css"; // Make sure to create the corresponding CSS file

const LoginPage = () => {
  // State to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook to navigate between pages

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login (authentication, API call, etc.)
    alert("Login successful!");
    // Optionally, navigate to a home page after successful login
    navigate("/");
  };

  const handleSignUpRedirect = () => {
    // Navigate to the sign-up page
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="login-form">
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

          <button type="submit" className="login-button">
            Login
          </button>

          {/* Text prompt and Sign-Up Button */}
          <div className="signup-redirect">
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={handleSignUpRedirect} className="signup-button">
                Sign Up here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
