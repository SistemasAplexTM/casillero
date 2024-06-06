import axios from 'axios';
import { getToken } from '@/utils/auth';

// Creación de la instancia de Axios
const service = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API, // api base_url
  timeout: 5000, // Tiempo máximo de espera para una solicitud ajax
  headers: {
    'Authorization': 'Bearer ' + getToken(),
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Interceptores de solicitud
service.interceptors.request.use(
  config => {
    // Solo establecer 'Content-Type' si no es un FormData
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    } else {
      // Eliminar 'Content-Type' si es un FormData para que Axios lo maneje automáticamente
      delete config.headers['Content-Type'];
    }
    return config;
  },
  error => {
    // Manejo de errores en la solicitud
    return Promise.reject(error);
  }
);

// Interceptores de respuesta
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;