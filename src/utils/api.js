import axios from 'axios';

const API_BASE_URL = 'http://localhost:50001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiPost = async (endpoint, data) => {
  try {
    // Make sure endpoint starts with /
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await api.post(formattedEndpoint, data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error);
    if (error.response) {
      const message = error.response.data?.message || `Request failed with status ${error.response.status}`;
      throw new Error(message);
    } else if (error.request) {
      throw new Error('Network error - please check your connection');
    } else {
      throw new Error('Request configuration error');
    }
  }
};

export const apiGet = async (endpoint) => {
  try {
    // Use axios instance instead of fetch
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await api.get(formattedEndpoint);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error);
    if (error.response) {
      const message = error.response.data?.message || `Request failed with status ${error.response.status}`;
      throw new Error(message);
    } else if (error.request) {
      throw new Error('Network error - please check your connection');
    } else {
      throw new Error('Request configuration error');
    }
  }
};