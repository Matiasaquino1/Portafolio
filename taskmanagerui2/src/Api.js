import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskmanager-api.onrender.com/api/tasks' 
});

export default api;