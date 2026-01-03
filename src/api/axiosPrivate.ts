import axios from "axios";
import { publicInstance } from "./axiosPublic";

export const privateInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

privateInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

privateInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {      
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await publicInstance.post("/auth/refresh");

        localStorage.setItem("accessToken", response.data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${response.data.accessToken}`;

        return privateInstance(originalRequest);
      } catch (e) {
        localStorage.removeItem("accessToken");
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);