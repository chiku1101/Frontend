import axios from 'axios';

const API_BASE_URL = 'http://localhost:50001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiGet = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error);
    throw new Error(error.response?.data?.message || 'API request failed');
  }
};

export const apiPost = async (endpoint, data) => {
  try {
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    console.log('Making request to:', API_BASE_URL + formattedEndpoint);
    console.log('With data:', data);
    
    const response = await api.post(formattedEndpoint, data);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Detailed API Error:', {
      message: error.response?.data?.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    if (error.response) {
      throw new Error(error.response.data?.message || `Request failed with status ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Network error - please check your connection');
    } else {
      throw new Error('Request configuration error');
    }
  }
};