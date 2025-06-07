import {getItem, removeItem, setItem} from "../Utils/localStorage.tsx";

import.meta.env;
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError} from "axios";
import { RefreshTokenResponse } from "../Types/types.tsx";

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
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// baseApi.interceptors.response.use(
//   response => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
//
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//
//       try {
//         const refreshToken = getItem('refreshToken');
//
//         if (!refreshToken) {
//           removeItem('token');
//           return Promise.reject(new Error('No refresh token available'));
//         }
//
//         const res: RefreshTokenResponse = await baseApi.post('/auth/token/refresh', { refreshToken });
//
//         const { accessToken, refreshToken: newRefreshToken } = res;
//
//         setItem('token', accessToken);
//         setItem('refreshToken', newRefreshToken);
//
//         originalRequest.headers = originalRequest.headers || {};
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//
//         return baseApi(originalRequest);
//
//       } catch (refreshError) {
//         removeItem('token');
//         removeItem('refreshToken');
//         return Promise.reject(refreshError);
//       }
//     }
//
//     return Promise.reject(error);
//   },
// );

export default baseApi;