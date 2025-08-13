import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SimulationForm from "./pages/SimulationForm";
import Drivers from "./pages/Drivers";
import RoutesPage from "./pages/Routes";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";

// Wrapper for protected routes
function PrivateRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" />;
}

function App() {
  // Track login status in state, initialized from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/simulation"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <SimulationForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/drivers"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Drivers />
            </PrivateRoute>
          }
        />
        <Route
          path="/routes"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <RoutesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Orders />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;