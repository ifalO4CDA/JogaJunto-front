import axios from "axios";
import { handleLogoff } from "../utils/auth"; // Função de logoff manual

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para verificar token expirado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Token expirado"
    ) {
      handleLogoff(); // Chama o logoff se o token estiver expirado
    }
    return Promise.reject(error);
  }
);

export default api;
