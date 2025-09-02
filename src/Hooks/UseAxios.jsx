// UseAxiosSecure.js
import axios from "axios";

// Create axios instance
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

// Add JWT token automatically to requests
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Hook / helper to use this axios instance
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
