import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskmanager-yw4y.onrender.com/api'
});

export default api;
