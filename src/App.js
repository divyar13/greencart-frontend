import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SimulationForm from "./pages/SimulationForm";
import Drivers from "./pages/Drivers";
import RoutesPage from "./pages/Routes";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      {isLoggedIn && <Navbar />} {/* Navbar now always shows when logged in */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/simulation"
          element={
            <PrivateRoute>
              <SimulationForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/drivers"
          element={
            <PrivateRoute>
              <Drivers />
            </PrivateRoute>
          }
        />
        <Route
          path="/routes"
          element={
            <PrivateRoute>
              <RoutesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
