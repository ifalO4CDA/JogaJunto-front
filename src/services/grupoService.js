import api from "./api";

export const GruposService = {
  // Criar um novo grupo
  criarGrupo: async (dadosGrupo) => {
    const resposta = await api.post("/group", dadosGrupo);
    return resposta.data;
  },

  // Buscar grupos do usuário usando GET com query parameters
  getGruposPorUsuario: async (idUsuario) => {
    try {
      const resposta = await api.get(`/group/usuario`, {
        params: { id_usuario: idUsuario }, // Envia como parâmetro na URL
      });
      return resposta.data.data; // Retorna a lista de grupos
    } catch (error) {
      console.error("Erro ao buscar grupos do usuário:", error.response?.data || error.message);
      throw error;
    }
  },

  // Buscar informações de um grupo específico
  getGrupoPorId: async (idGrupo) => {
    try {
      const resposta = await api.get(`/group/${idGrupo}`); // Envia o ID no caminho da URL
      return resposta.data.data; // Retorna os dados do grupo
    } catch (error) {
      console.error("Erro ao buscar informações do grupo:", error.response?.data || error.message);
      throw error;
    }
  },
};
