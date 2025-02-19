import axios from 'axios';
import { apiConfig } from '../config/api';

const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Auth service for authentication related operations
export const authService = {
  signup: async (userData) => {
    try {
      const response = await api.post(apiConfig.endpoints.signup, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error) {
      console.error('Get current user failed:', error);
      throw error;
    }
  }
};

// API service for other operations
export const apiService = {
  // Add connection check
  checkConnection: async () => {
    try {
      await api.get('/health');
      return true;
    } catch (error) {
      console.error('API connection failed:', error);
      throw new Error('Unable to connect to the server');
    }
  },

  // Add current user endpoint
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      console.log('Attempting signup with:', userData);
      const response = await api.post(apiConfig.endpoints.signup, userData);
      console.log('Signup response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Auth endpoints
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // User endpoints
  async updateProfile(userData) {
    return await api.put('/users/profile', userData);
  },

  // Blog endpoints
  async getBlogs() {
    return await api.get('/blogs');
  },

  async createBlog(blogData) {
    return await api.post('/blogs', blogData);
  },

  async updateBlog(id, blogData) {
    return await api.put(`/blogs/${id}`, blogData);
  },

  async deleteBlog(id) {
    return await api.delete(`/blogs/${id}`);
  },
};

// Export api instance
export { api };