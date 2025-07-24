// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL:  'https://implusbackend-3.onrender.com/',
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;