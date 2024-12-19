import api from "./api"; 

export const UsuariosService = {
  // Criar um novo usuário
  criarUsuario: async (dadosUsuario) => {
    const resposta = await api.post("/users", dadosUsuario);
    return resposta.data;
  },

  exibirUsuarios: async () => {
    const resposta = await api.get("/users");
    return resposta.data;
  },

//   // Buscar todos os usuários
//   buscarUsuarios: async () => {
//     const resposta = await api.get("/usuarios");
//     return resposta.data;
//   },

//   // Alterar informações de um usuário
//   alterarUsuario: async (id, dadosUsuario) => {
//     const resposta = await api.put(`/usuarios/${id}`, dadosUsuario);
//     return resposta.data;
//   },

//   // Remover um usuário
//   removerUsuario: async (id) => {
//     const resposta = await api.delete(`/usuarios/${id}`);
//     return resposta.data;
//   },
};
