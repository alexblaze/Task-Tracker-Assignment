// axiosInterceptor.js
import axios from "axios";
import toast from "react-hot-toast";

// Get the BASE_URL from the .env file
const BASE_URL = "http://localhost:8080/api/tasks";

// Create an instance of Axios with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add an interceptor to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    toast.error(error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
