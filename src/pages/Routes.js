import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import "./RoutesClassic.css"; // New style file

function Routes() {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    routeId: "",
    distanceKm: "",
    trafficLevel: "Low",
    baseTime: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchRoutes = async () => {
    const res = await axiosInstance.get("/routes");
    setRoutes(res.data);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axiosInstance.put(`/routes/${editingId}`, form);
      setEditingId(null);
    } else {
      await axiosInstance.post("/routes", form);
    }
    setForm({ routeId: "", distanceKm: "", trafficLevel: "Low", baseTime: "" });
    fetchRoutes();
  };

  const handleEdit = (route) => {
    setForm(route);
    setEditingId(route._id);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/routes/${id}`);
    fetchRoutes();
  };

  return (
    <div className="routes-container">
      <div className="routes-card">
        <h2 className="routes-title">Routes Management</h2>

        <form onSubmit={handleSubmit} className="routes-form">
          <div className="form-group">
            <label>Route ID</label>
            <input
              placeholder="Route ID"
              value={form.routeId}
              onChange={(e) => setForm({ ...form, routeId: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Distance (km)</label>
            <input
              type="number"
              placeholder="Distance in km"
              value={form.distanceKm}
              onChange={(e) => setForm({ ...form, distanceKm: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Traffic Level</label>
            <select
              value={form.trafficLevel}
              onChange={(e) =>
                setForm({ ...form, trafficLevel: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Base Time (minutes)</label>
            <input
              type="number"
              placeholder="Base time in minutes"
              value={form.baseTime}
              onChange={(e) => setForm({ ...form, baseTime: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            {editingId ? "Update" : "Add"} Route
          </button>
        </form>
      </div>

      <div className="routes-table-card">
        <table className="routes-table">
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Distance</th>
              <th>Traffic Level</th>
              <th>Base Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r._id}>
                <td>{r.routeId}</td>
                <td>{r.distanceKm}</td>
                <td>{r.trafficLevel}</td>
                <td>{r.baseTime}</td>
                <td>
                  <button
                    onClick={() => handleEdit(r)}
                    className="secondary-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="danger-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {routes.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#777" }}>
                  No routes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Routes;
