import api from "./api";

export const ReservaService = {
  // Criar uma reserva
  criarReserva: async (dadosReserva) => {
    try {
      const resposta = await api.post("/reservation", dadosReserva);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao criar reserva:", error.response?.data || error);
      throw error;
    }
  },

  // Obter todas as reservas ativas
  getReservasAtivas: async () => {
    try {
      const resposta = await api.get("/reservation"); // Rota corrigida
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar reservas ativas:", error.response?.data || error);
      throw error;
    }
  },
};
