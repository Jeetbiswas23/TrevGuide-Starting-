import axiosInstance from './axiosInstance';

export const apiService = {
  // Auth endpoints
  async signup(userData) {
    const response = await axiosInstance.post('/auth/signup', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async login(credentials) {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // User endpoints
  async updateProfile(userData) {
    return await axiosInstance.put('/users/profile', userData);
  },

  // Blog endpoints
  async getBlogs() {
    return await axiosInstance.get('/blogs');
  },

  async createBlog(blogData) {
    return await axiosInstance.post('/blogs', blogData);
  },

  async updateBlog(id, blogData) {
    return await axiosInstance.put(`/blogs/${id}`, blogData);
  },

  async deleteBlog(id) {
    return await axiosInstance.delete(`/blogs/${id}`);
  },
};