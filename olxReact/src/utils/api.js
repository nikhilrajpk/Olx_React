import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  // headers: {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust to how you store the token
  // },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
