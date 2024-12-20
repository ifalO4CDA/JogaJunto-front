import api from "./api";

export const GruposService = {
  criarGrupo: async (dadosGrupo) => {
    const resposta = await api.post("/group", dadosGrupo);
    return resposta.data;
  },

  getGruposPorUsuario: async (idUsuario) => {
    try {
      const resposta = await api.get(`/group/usuario/${idUsuario}`);
      return resposta.data.data;
    } catch (error) {
      console.error("Erro ao buscar grupos do usuário:", error.response?.data || error.message);
      throw error;
    }
  },

  getGrupoPorId: async (id) => {
    try {
      const resposta = await api.get(`/group/${id}`);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar grupo:", error.response?.data || error);
      throw error;
    }
  },

  getMembrosDoGrupo: async (id) => {
    try {
      const resposta = await api.get(`/group/grupoMembros/${id}`);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar membros do grupo:", error.response?.data || error);
      throw error;
    }
  },

  adicionarMembro: async (dados) => {
    try {
      const resposta = await api.post(`/group/membro`, dados);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao adicionar membro ao grupo:", error.response?.data || error);
      throw error;
    }
  },
};
