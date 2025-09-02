import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

// Add JWT token automatically to requests
axiosSecure.interceptors.request.use(config => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const UseAxiosSecure = () => axiosSecure;

export default UseAxiosSecure;
