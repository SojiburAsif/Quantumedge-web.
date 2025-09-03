import axios from "axios";

// Axios instance
const axiosSecure = axios.create({
  baseURL: "https://lacsing.vercel.app/",
  withCredentials: true, 
});


axiosSecure.interceptors.request.use(
  (config) => {
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
