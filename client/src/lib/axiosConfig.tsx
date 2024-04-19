import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
});

// Cors middleware
instance.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = 'bearer';
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  config.headers['Access-Control-Allow-Credentials'] = 'true';
  return config;
});

export default instance;