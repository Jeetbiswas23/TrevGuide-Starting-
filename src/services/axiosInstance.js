import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',  // Remove /api since it's added in routes
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  config => {
    console.log('Making request to:', config.url);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Request failed:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
