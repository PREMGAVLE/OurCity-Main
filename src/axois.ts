// src/axiosInstance.ts
import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios'; // 👈 Correct type for interceptor config

const instance = axios.create({
  baseURL: 'https://burhanpur-city-backend-mfs4.onrender.com/api/',
});

// Correctly typed interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
