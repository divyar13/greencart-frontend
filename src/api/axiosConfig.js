import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
