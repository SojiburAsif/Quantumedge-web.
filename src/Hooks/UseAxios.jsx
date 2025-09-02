import axios from "axios";

// Axios instance
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // ✅ Send cookies automatically
});

// Optional: request interceptor (যদি প্রয়োজন হয়, যেমন logging)
axiosSecure.interceptors.request.use(
  (config) => {
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: response interceptor (error handling)
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
