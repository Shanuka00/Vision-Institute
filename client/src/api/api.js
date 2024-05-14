import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/vision',
});

// add the token to the Authorization header of subsequent requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token !== null && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
