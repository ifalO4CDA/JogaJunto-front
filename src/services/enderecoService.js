import api from "./api"; // Importe a configuração do Axios

export const EnderecoService = {
  // Criar um novo endereço
  criarEndereco: async (dadosEndereco) => {
    try {
      const resposta = await api.post("/addresses", dadosEndereco);
      return resposta.data; // Retorna os dados da API
    } catch (error) {
      console.error("Erro ao criar endereço:", error.response?.data || error.message);
      throw error;
    }
  },

  // Editar um endereço existente
//   editarEndereco: async (id, dadosEndereco) => {
//     try {
//       const resposta = await api.put(`/addresses/${id}`, dadosEndereco);
//       return resposta.data; // Retorna os dados atualizados da API
//     } catch (error) {
//       console.error("Erro ao editar endereço:", error.response?.data || error.message);
//       throw error;
//     }
//   },

  // Recuperar endereço pelo ID (usuário ou quadra)
  recuperarEndereco: async (id) => {
    try {
      const resposta = await api.get(`/addresses/${id}`);
      return resposta.data; // Retorna os dados do endereço
    } catch (error) {
      console.error("Erro ao recuperar endereço:", error.response?.data || error.message);
      throw error;
    }
  },
};
