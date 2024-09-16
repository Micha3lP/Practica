import axios from 'axios';
import { authService } from './authService';

// Crea una instancia de Axios
const apiClient = axios.create({
  baseURL: 'https://localhost:7008/api',
});

// Interceptor para agregar el token a todas las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Opcional: interceptor de respuesta para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      authService.logout();
      window.location.href = '/'; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
