import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskmanager-hzrt.onrender.com/api/tasks/'
});

export default api;
