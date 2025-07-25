import axios from 'axios';

const API  = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response && (error.response.status===401 || error.response.status===403)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;