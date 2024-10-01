// src/utils/axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Adjust the base URL as needed
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Check if error is due to unauthorized access
      if (error.response && error.response.status === 401) {
        // Remove token and redirect to login
        localStorage.removeItem('token');
        delete instance.defaults.headers.common['Authorization'];
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );

export default instance;
