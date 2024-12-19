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

  const handleFotoChange = (e) => {
    setDadosPessoais((prevState) => ({
      ...prevState,
      fotoDocumento: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termosAceitos) {
      alert("Você precisa aceitar os Termos de Serviço.");
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

    console.log("Dados Pessoais Enviados:", {
      id_usuario: idUsuario,
      data_nascimento: dadosPessoais.dataNascimento,
      cpf: dadosPessoais.cpf,
      documento_oficial: dadosPessoais.fotoDocumento?.name,
    });

    console.log("Dados de Endereço Enviados:", dadosEndereco);

    try {
      // Requisição para informações complementares
      const respostaPessoal = await UsuariosService.criarInformacoes(dadosComplementares);
      console.log("Resposta da API para informações complementares:", respostaPessoal);

      // Requisição para criar endereço
      const respostaEndereco = await EnderecoService.criarEndereco(dadosEndereco);
      console.log("Resposta da API para endereço:", respostaEndereco);

      alert("Cadastro complementar concluído com sucesso!");
      window.location.href = "/perfil"; // Redireciona para o perfil
    } catch (error) {
      console.error("Erro ao concluir o cadastro complementar:", error.response?.data || error);
      alert("Erro ao concluir o cadastro. Verifique os dados e tente novamente.");
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
                  required
                />
              </div>

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
