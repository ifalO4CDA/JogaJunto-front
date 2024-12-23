import api from "./api";

export const ReservaService = {
  criarReserva: async (dadosReserva) => {
    try {
      const resposta = await api.post("/reservation", dadosReserva);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao criar reserva:", error.response?.data || error);
      throw error;
    }
  },

  getReservaAtiva: async (idSala) => {
    try {
      const resposta = await api.get(`/reservation/ativa/${idSala}`);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar reserva ativa:", error.response?.data || error);
      throw error;
    }
  },
};
