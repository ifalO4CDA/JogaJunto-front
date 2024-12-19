import api from "./api";

export const GruposService = {
  criarGrupo: async (dadosGrupo) => {
    const resposta = await api.post("/group", dadosGrupo);
    return resposta.data;
  },

  getGruposPorUsuario: async (idUsuario) => {
    try {
      // Enviando o ID do usuário como parâmetro na URL
      const resposta = await api.get(`/group/usuario/${idUsuario}`);
      return resposta.data.data; // Retorna os grupos do usuário
    } catch (error) {
      console.error("Erro ao buscar grupos do usuário:", error.response?.data || error.message);
      throw error;
    }
  },

  getGrupoPorId: async (id) => {
    try {
      const resposta = await api.get(`/group/${id}`); // Rota para obter os dados do grupo
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar grupo:", error.response?.data || error);
      throw error;
    }
  },

  getMembrosDoGrupo: async (id) => {
    try {
      const resposta = await api.get(`/group/grupoMembros/${id}`); // Rota para obter membros do grupo
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar membros do grupo:", error.response?.data || error);
      throw error;
    }
  },
};
