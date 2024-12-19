import api from "./api";

export const ArenaService = {
  // Obter todas as quadras
  getArenas: async () => {
    try {
      const response = await api.get("/courts");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar arenas:", error.response?.data || error);
      throw error;
    }
  },

  getCourts: async () => {
    try {
      const resposta = await api.get("/courts");
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar quadras:", error.response?.data || error);
      throw error;
    }
  },


  // Obter detalhes de uma quadra pelo ID
  getArenaById: async (id) => {
    try {
      const response = await api.get(`/courts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar arena:", error.response?.data || error);
      throw error;
    }
  },
};
