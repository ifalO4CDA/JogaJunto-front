import api from "./api"; 

export const UsuariosService = {
  // Criar um novo usuário
  criarUsuario: async (dadosUsuario) => {
    const resposta = await api.post("/users", dadosUsuario);
    return resposta.data;
  },

  login: async (dadosLogin) => {
    const resposta = await api.post("/users/login", dadosLogin);
    return resposta.data; // Retorna o token e as informações do usuário
  },

  exibirUsuarios: async () => {
    const resposta = await api.get("/users");
    return resposta.data;
  },


  // Criar informações complementares
  criarInformacoes: async (dados) => {
    try {
      const resposta = await api.post("/moreInformations", dados);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao criar informações complementares:", error.response?.data || error.message);
      throw error;
    }
  },

  // Recuperar informações complementares pelo ID do usuário
  recuperarInformacoes: async (id) => {
    try {
      const resposta = await api.get(`/moreInformations/${id}`);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao recuperar informações complementares:", error.response?.data || error.message);
      throw error;
    }
  },

  // Editar informações complementares (se necessário)
  editarInformacoes: async (id, dados) => {
    try {
      const resposta = await api.put(`/moreInformations/${id}`, dados);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao editar informações complementares:", error.response?.data || error.message);
      throw error;
    }
  },
  
};
