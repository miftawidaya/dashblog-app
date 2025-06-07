// src/utils/apis/axios-with-config.ts
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const axiosWithConfig = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosWithConfig.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosWithConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      console.warn('Unauthorized! You might want to redirect to login page.');
    }

    if (statusCode === 403) {
      console.warn(
        'Forbidden! You do not have permission to access this resource.'
      );
    }

    if (statusCode === 500) {
      console.warn(
        'Internal Server Error! Something went wrong on the server or try again later.'
      );
    }

    return Promise.reject(error);
  }
);

export default axiosWithConfig;
