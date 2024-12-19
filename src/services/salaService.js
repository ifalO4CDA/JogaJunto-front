import api from "./api";

// Serviço para as requisições relacionadas a salas
export const SalasService = {
  getSalas: async () => {
    const response = await api.get("/salas");
    return response.data;
  },

  createSala: async (data) => {
    const response = await api.post("/salas", data);
    return response.data;
  },

  getSalaById: async (id) => {
    const response = await api.get(`/salas/${id}`);
    return response.data;
  },
};
