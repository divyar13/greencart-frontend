import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="nav-logo">🚛 GreenCart</span>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/simulation" className="nav-link">
          Simulation
        </Link>
        <Link to="/drivers" className="nav-link">
          Drivers
        </Link>
        <Link to="/routes" className="nav-link">
          Routes
        </Link>
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
      </div>
      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
