import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import "./DriversClassic.css"; // New CSS file

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    currentShiftHours: "",
    past7DayHours: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDrivers = async () => {
    const res = await axiosInstance.get("/drivers");
    setDrivers(res.data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axiosInstance.put(`/drivers/${editingId}`, {
        ...form,
        past7DayHours: form.past7DayHours.split(",").map(Number),
      });
      setEditingId(null);
    } else {
      await axiosInstance.post("/drivers", {
        ...form,
        past7DayHours: form.past7DayHours.split(",").map(Number),
      });
    }
    setForm({ name: "", currentShiftHours: "", past7DayHours: "" });
    fetchDrivers();
  };

  const handleEdit = (driver) => {
    setForm({
      name: driver.name,
      currentShiftHours: driver.currentShiftHours,
      past7DayHours: driver.past7DayHours.join(","),
    });
    setEditingId(driver._id);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/drivers/${id}`);
    fetchDrivers();
  };

  return (
    <div className="drivers-container">
      <div className="drivers-card">
        <h2 className="drivers-title">Drivers Management</h2>

        <form onSubmit={handleSubmit} className="drivers-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Current Shift Hours:</label>
            <input
              type="number"
              placeholder="Current Shift Hours"
              value={form.currentShiftHours}
              onChange={(e) =>
                setForm({ ...form, currentShiftHours: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Past 7 Day Hours:</label>
            <input
              placeholder="Comma separated (e.g. 8,7,6,8,7,5,6)"
              value={form.past7DayHours}
              onChange={(e) =>
                setForm({ ...form, past7DayHours: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            {editingId ? "Update" : "Add"} Driver
          </button>
        </form>
      </div>

      <div className="drivers-table-card">
        <table className="drivers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Shift Hours</th>
              <th>Past 7 Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.currentShiftHours}</td>
                <td>{d.past7DayHours.join(", ")}</td>
                <td>
                  <button
                    onClick={() => handleEdit(d)}
                    className="secondary-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d._id)}
                    className="danger-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#777" }}>
                  No drivers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Drivers;
