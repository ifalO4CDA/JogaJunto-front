import React, { useState } from "react";
import "../../styles/pages/cadastro/cadastroUsuario.css";
import Ilustracao from "../../assets/Ilustracao.png";
import { UsuariosService } from "../../services/usuarioService";
import { EnderecoService } from "../../services/enderecoService";

function CadastroComplementar() {
  const [dadosPessoais, setDadosPessoais] = useState({
    data_nascimento: "",
    cpf: "",
    documento_oficial: null,
  });

  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    cidade: "",
    estado: "",
    complemento: "",
    bairro: "",
  });

  const [termosAceitos, setTermosAceitos] = useState(false);
  const [mensagemErro, setMensagemErro] = useState(null); // Para exibir erros
  const [mensagemSucesso, setMensagemSucesso] = useState(null); // Para exibir sucesso

  const handleFotoChange = (e) => {
    setDadosPessoais((prevState) => ({
      ...prevState,
      fotoDocumento: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro(null); // Limpa mensagens anteriores
    setMensagemSucesso(null);

    if (!termosAceitos) {
      setMensagemErro("Você precisa aceitar os Termos de Serviço.");
      return;
    }

    const idUsuario = localStorage.getItem("id");

    // Dados para informações complementares
    const dadosComplementares = new FormData();
    dadosComplementares.append("id_usuario", idUsuario);
    dadosComplementares.append("documento_oficial", dadosPessoais.fotoDocumento);
    dadosComplementares.append("data_nascimento", dadosPessoais.dataNascimento);
    dadosComplementares.append("cpf", dadosPessoais.cpf);

    // Dados para endereço
    const dadosEndereco = {
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      cidade: endereco.cidade,
      estado: endereco.estado,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      id_usuario: idUsuario,
    };

    try {
      // Requisição para informações complementares
      await UsuariosService.criarInformacoes(dadosComplementares);

      // Requisição para criar endereço
      await EnderecoService.criarEndereco(dadosEndereco);

      setMensagemSucesso("Cadastro complementar concluído com sucesso!");
      setTimeout(() => {
        window.location.href = "/perfil"; // Redireciona para o perfil
      }, 2000);
    } catch (error) {
      const erros = error.response?.data?.errors || [error.response?.data?.message] || ["Erro desconhecido"];
      // Garante que erros sejam transformados em strings
      const mensagemErro = Array.isArray(erros)
        ? erros.map((err) => (typeof err === "string" ? err : err.msg || JSON.stringify(err))).join(" ")
        : typeof erros === "string"
          ? erros
          : "Erro desconhecido.";
      setMensagemErro(mensagemErro);
    }
  };


  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Coluna da Ilustração */}
        <div className="col-md-5 text-center">
          <img src={Ilustracao} alt="Ilustração de Cadastro" className="img-fluid" />
        </div>

        {/* Coluna do Formulário */}
        <div className="col-md-7">
          <div className="form-wrapper p-4 rounded">
            {/* Botão para Upload de Documento */}
            <div className="mb-4 text-center">
              <label htmlFor="fotoDocumentoInput" className="upload-button">
                {dadosPessoais.fotoDocumento ? (
                  <img
                    src={URL.createObjectURL(dadosPessoais.fotoDocumento)}
                    alt="Foto do Documento"
                    className="uploaded-image"
                  />
                ) : (
                  <span>Adicionar Foto do Documento</span>
                )}
              </label>
              <input
                type="file"
                id="fotoDocumentoInput"
                accept="image/*"
                onChange={handleFotoChange}
                style={{ display: "none" }}
                required
              />
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit}>
              {/* Dados Pessoais */}
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data de Nascimento"
                  value={dadosPessoais.dataNascimento}
                  onChange={(e) =>
                    setDadosPessoais((prev) => ({
                      ...prev,
                      dataNascimento: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CPF"
                  value={dadosPessoais.cpf}
                  onChange={(e) =>
                    setDadosPessoais((prev) => ({
                      ...prev,
                      cpf: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Endereço */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="number"
                    maxLength={8}
                    minLength={8}
                    className="form-control"
                    placeholder="CEP"
                    value={endereco.cep}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        cep: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Logradouro"
                    value={endereco.logradouro}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        logradouro: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número"
                    value={endereco.numero}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        numero: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cidade"
                    value={endereco.cidade}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        cidade: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Estado"
                    maxLength={2}
                    value={endereco.estado}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        estado: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bairro"
                    value={endereco.bairro}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        bairro: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Complemento"
                    value={endereco.complemento}
                    onChange={(e) =>
                      setEndereco((prev) => ({
                        ...prev,
                        complemento: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Mensagens de erro ou sucesso */}
              {mensagemErro && <div className="alert alert-danger">{mensagemErro}</div>}
              {mensagemSucesso && <div className="alert alert-success">{mensagemSucesso}</div>}

              {/* Aceitação dos Termos */}
              <div className="form-check mb-4 text-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termosCheck"
                  checked={termosAceitos}
                  onChange={(e) => setTermosAceitos(e.target.checked)}
                  required
                />
                <label className="form-check-label" htmlFor="termosCheck">
                  Eu aceito os{" "}
                  <a href="/termos" target="_blank">
                    Termos de Serviço
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                style={{ backgroundColor: "#2FD151", borderColor: "#2FD151" }}
              >
                Concluir
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroComplementar;
