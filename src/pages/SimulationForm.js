import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./SimulationFormClassic.css"; // classic style file

function SimulationForm() {
  const [driversAvailable, setDriversAvailable] = useState(5);
  const [startTime, setStartTime] = useState("08:00");
  const [maxHoursPerDay, setMaxHoursPerDay] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axiosInstance.post("/simulation", {
        driversAvailable: Number(driversAvailable),
        startTime,
        maxHoursPerDay: Number(maxHoursPerDay),
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Simulation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-container">
      <div className="sf-card">
        <h2 className="sf-title">Run Logistics Simulation</h2>
        {error && <p className="sf-error">{error}</p>}

        <form onSubmit={handleSubmit} className="sf-form">
          <div className="sf-form-group">
            <label>Drivers Available</label>
            <input
              type="number"
              value={driversAvailable}
              onChange={(e) => setDriversAvailable(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="sf-form-group">
            <label>Shift Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="sf-form-group">
            <label>Max Hours Per Day</label>
            <input
              type="number"
              value={maxHoursPerDay}
              onChange={(e) => setMaxHoursPerDay(e.target.value)}
              min="1"
              required
            />
          </div>

          <button type="submit" className="sf-btn" disabled={loading}>
            {loading ? "Running..." : "Run Simulation"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SimulationForm;
