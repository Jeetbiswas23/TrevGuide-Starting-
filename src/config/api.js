import axios from 'axios';

export const apiConfig = {
  baseURL: 'http://localhost:3000',
  endpoints: {
    auth: '/auth',
    signup: '/signup',
    health: '/health'
  }
};

// Remove duplicate api creation and export
export const initializeApi = async () => {
  try {
    const response = await fetch(`${apiConfig.baseURL}${apiConfig.endpoints.health}`);
    if (!response.ok) throw new Error('API health check failed');
    return true;
  } catch (error) {
    console.error('API initialization failed:', error);
    throw new Error('Unable to connect to server');
  }
};