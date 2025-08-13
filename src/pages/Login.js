import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // import styles

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="bg-animation"></div>
      <div className="login-card">
        <h2 className="login-title">🚛 GreenCart Manager</h2>
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button type="submit" className="login-btn">
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
