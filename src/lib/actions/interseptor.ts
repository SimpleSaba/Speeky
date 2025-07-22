// src/lib/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true, // if you're using cookies
});

// ✅ Request Interceptor: attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // or from Redux if you prefer

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired or unauthorized
      console.warn("Unauthorized! Redirecting to login...");
      // e.g., router.push("/login"); OR clear token
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
