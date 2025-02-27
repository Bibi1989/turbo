"use client";

import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error?.response?.status === 401) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
