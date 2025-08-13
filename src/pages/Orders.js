import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import "./OrdersClassic.css"; // New CSS file

function Orders() {
  const [orders, setOrders] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    orderId: "",
    valueRs: "",
    assignedRoute: "",
    deliveryTimestamp: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchOrders = async () => {
    const res = await axiosInstance.get("/orders");
    setOrders(res.data);
  };

  const fetchRoutes = async () => {
    const res = await axiosInstance.get("/routes");
    setRoutes(res.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axiosInstance.put(`/orders/${editingId}`, form);
      setEditingId(null);
    } else {
      await axiosInstance.post("/orders", form);
    }
    setForm({
      orderId: "",
      valueRs: "",
      assignedRoute: "",
      deliveryTimestamp: "",
    });
    fetchOrders();
  };

  const handleEdit = (order) => {
    setForm({
      orderId: order.orderId,
      valueRs: order.valueRs,
      assignedRoute: order.assignedRoute?._id,
      deliveryTimestamp: order.deliveryTimestamp?.slice(0, 16),
    });
    setEditingId(order._id);
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/orders/${id}`);
    fetchOrders();
  };

  return (
    <div className="orders-container">
      <div className="orders-card">
        <h2 className="orders-title">Orders Management</h2>

        <form onSubmit={handleSubmit} className="orders-form">
          <div className="form-group">
            <label>Order ID</label>
            <input
              placeholder="Order ID"
              value={form.orderId}
              onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Value (Rs)</label>
            <input
              type="number"
              placeholder="Value in Rs"
              value={form.valueRs}
              onChange={(e) => setForm({ ...form, valueRs: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Assigned Route</label>
            <select
              value={form.assignedRoute}
              onChange={(e) =>
                setForm({ ...form, assignedRoute: e.target.value })
              }
              required
            >
              <option value="">Select Route</option>
              {routes.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.routeId} - {r.distanceKm} km
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Delivery Time</label>
            <input
              type="datetime-local"
              value={form.deliveryTimestamp}
              onChange={(e) =>
                setForm({ ...form, deliveryTimestamp: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            {editingId ? "Update" : "Add"} Order
          </button>
        </form>
      </div>

      <div className="orders-table-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Value</th>
              <th>Route</th>
              <th>Delivery Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.orderId}</td>
                <td>{o.valueRs}</td>
                <td>{o.assignedRoute?.routeId || "N/A"}</td>
                <td>{new Date(o.deliveryTimestamp).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(o)}
                    className="secondary-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(o._id)}
                    className="danger-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#777" }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
