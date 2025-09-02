import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yelping-jasmina-aquinoteam-dd8c8eb0.koyeb.app/api/tasks' // Cambia por la URL real de tu API
});

export default api;