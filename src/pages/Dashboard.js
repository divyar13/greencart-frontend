import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./Dashboard.css"; // Import the CSS styles below

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

function Dashboard() {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSimulationData = async () => {
    try {
      setLoading(true);
      // Simulated params; you can make these dynamic later
      const res = await axiosInstance.post("/simulation", {
        driversAvailable: 5,
        startTime: "08:00",
        maxHoursPerDay: 8,
      });
      setKpiData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimulationData();
  }, []);

  if (loading) return <p className="loading-text">Loading dashboard...</p>;
  if (!kpiData) return <p className="no-data-text">No data available</p>;

  const pieData = {
    labels: ["On Time Deliveries", "Late Deliveries"],
    datasets: [
      {
        data: [kpiData.onTimeDeliveries, kpiData.lateDeliveries],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverOffset: 15,
      },
    ],
  };

  const barData = {
    labels: ["Total Profit", "Fuel Cost", "Efficiency (%)"],
    datasets: [
      {
        label: "KPI Metrics",
        data: [kpiData.totalProfit, kpiData.fuelCost, kpiData.efficiency],
        backgroundColor: ["#2196F3", "#FF9800", "#9C27B0"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Logistics KPI Dashboard</h2>
      <button onClick={fetchSimulationData} className="refresh-btn">
        🔄 Run Simulation Again
      </button>

      <div className="charts-wrapper">
        <div className="chart-card pie-chart">
          <h3>Delivery Performance</h3>
          <Pie data={pieData} />
        </div>

        <div className="chart-card bar-chart">
          <h3>Key Metrics</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
