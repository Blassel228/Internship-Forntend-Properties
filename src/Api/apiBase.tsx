import { getItem, removeItem, setItem } from "../Utils/localStorage.tsx";
import axios, { AxiosInstance } from "axios";
import routers from "../Constants/routers.tsx";
import { refreshToken } from "./apiAuth.tsx";

const baseApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

baseApi.interceptors.request.use(
  (config) => {
    console.log("Request Sent:", config);
    const token = getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

baseApi.interceptors.response.use(
  (response) => {
    console.log("Response Received:", response);
    return response;
  },
  async (error) => {
    console.error("❌ Request Error:", error);
    if (error.response?.status === 401) {
      if (error.config?.url?.includes("/auth/refresh")) {
        console.error("💀 Refresh endpoint failed — logging out");
        removeItem("token");
        window.location.href = routers.home;
        return Promise.reject(error);
      }

      try {
        const data = await refreshToken();
        const newToken = data.access_token;
        setItem("token", newToken);
      } catch (refreshError) {
        console.error("💀 Refresh failed — clearing session", refreshError);
        removeItem("token");
        window.location.href = routers.home;
      }
    }

    return Promise.reject(error);
  },
);

export default baseApi;
