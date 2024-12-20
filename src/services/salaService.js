import api from "./api"; // Importa a configuração do Axios

export const SalasService = {
  // Criar uma nova sala
  criarSala: async (dadosSala) => {
    try {
      const resposta = await api.post("/rooms", dadosSala);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao criar sala:", error.response?.data || error.message);
      throw error;
    }
  },

  getSalaPorId: async (id) => {
    try {
      const resposta = await api.get(`/rooms/${id}`);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao buscar informações da sala:", error.response?.data || error.message);
      throw error;
    }
  },

  // Buscar todas as salas de um usuário pelo ID do usuário
  getSalasPorUsuario: async (idUsuario) => {
    try {
      const resposta = await api.get(`/rooms/user/${idUsuario}`);
      return resposta.data.data; // Certifique-se de acessar 'data'
    } catch (error) {
      console.error("Erro ao buscar salas por usuário:", error.response?.data || error);
      throw error;
    }
  },

  getMembrosDaSala: async (id) => {
    try {
      const resposta = await api.get(`/rooms/${id}/users`);
      return resposta.data.data; // Retorna somente o array de usuários
    } catch (error) {
      console.error("Erro ao buscar membros da sala:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar membros da sala.");
    }
  },  

  adicionarMembro: async (idSala, idUsuario) => {
    try {
      const resposta = await api.post(`/rooms/${idSala}/members`, {
        id_usuario: idUsuario, // Certifique-se de que o backend espera este campo exatamente assim
      });
      return resposta.data;
    } catch (error) {
      console.error("Erro ao adicionar membro à sala:", error.response?.data || error);
      throw error;
    }
  },

  excluirSala: async (idSala) => {
    try {
      const resposta = await api.delete(`/rooms/${idSala}`);
      return resposta.data;
    } catch (error) {
      console.error("Erro ao excluir sala:", error.response?.data || error.message);
      throw error;
    }
  },
  
};
