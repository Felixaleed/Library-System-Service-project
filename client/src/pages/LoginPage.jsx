import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Default to 'client'
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
  
      const { access_token, role } = response.data;
  
      if (!role) {
        throw new Error("Role is missing in the response");
      }
  
      localStorage.setItem("access_token", access_token);
  
      if (role === "admin") {
        alert("Admin login successful!");
        navigate("/admin");
      } else if (role === "customer") {
        alert("Client login successful!");
        navigate("/");
      } else {
        alert("Unknown role received. Redirecting to home page.");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      console.error("Error during login:", err);
    }
  };
  
  

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="redirect-message">
          Don't have an account?{" "}
          <button className="signup-redirect-button" onClick={handleSignUpRedirect}>
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
