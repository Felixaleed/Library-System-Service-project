import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to the home page
import axios from "axios"; // For making HTTP requests
import "./LoginPage.css"; // Make sure to create the corresponding CSS file

const LoginPage = () => {
  // State to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const navigate = useNavigate(); // Hook to navigate between pages

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend API
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      // Store the access token (if received) in local storage or state
      localStorage.setItem("access_token", response.data.access_token);

      // Navigate to the home page after successful login
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      // Handle errors
      console.error(error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
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
          {error && <p className="error-message">{error}</p>}
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
              <button
                type="button"
                onClick={handleSignUpRedirect}
                className="signup-button"
              >
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
