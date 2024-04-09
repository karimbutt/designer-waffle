// src/api/axiosClient.ts
import axios from 'axios';

// Create an Axios instance with base configuration
export const axiosClient = axios.create({
  baseURL: 'http://api.yourdomain.com/v1', // This should be the base URL of your API
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to insert the JWT token in requests when available
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Interceptor to handle responses or errors globally
axiosClient.interceptors.response.use(
  (response) => {
    // Perform actions on successful response (if needed)
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., redirect to login on 401 unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to login or perform other actions
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
