import { getItem, removeItem, setItem } from "../Utils/localStorage.tsx";
import axios, { AxiosInstance } from "axios";
import routers from "../Constants/routers.tsx";
import { refreshToken } from "./apiAuth.tsx";

const baseApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  timeout: 60000, // ✅ 60 секунд для великих файлів
  // ❌ ПРИБЕРИ глобальний Content-Type!
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

baseApi.interceptors.request.use(
  (config) => {
    console.log("Request Sent:", config);

    if (config.url?.includes("login")) {
      return config;
    }

    const token = getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // ✅ Встанови Content-Type тільки якщо це НЕ FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    // Якщо це FormData, браузер сам встановить правильний Content-Type з boundary

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

baseApi.interceptors.response.use(
  (response) => {
    console.log("Response Received:", response);
    return response;
  },
  async (error) => {
    console.error("Response Error:", error);

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.url?.includes("refresh")
    ) {
      console.error("Refresh token invalid — logging out");
      removeItem("token");
      window.location.href = routers.home;
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest.url?.includes("/api/image/")) {
        return Promise.reject(error);
      }

      if (originalRequest.url?.includes("login")) {
        return Promise.reject(error);
      }

      try {
        console.log("Trying to refresh token...");
        const data = await refreshToken();
        const newToken = data.access_token;

        console.log("Token refreshed successfully");
        setItem("token", newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return baseApi(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed — clearing session", refreshError);
        removeItem("token");
        window.location.href = routers.home;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default baseApi;