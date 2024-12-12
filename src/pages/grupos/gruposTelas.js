import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/pages/grupos/gruposTelas.css"; // CSS específico desta página

const GroupCard = ({ image, name, members }) => {
  return (
    <div className="group-card d-flex align-items-center p-3 shadow-sm mb-3">
      <img
        src={image}
        alt={name}
        className="group-card__image rounded-circle me-3"
      />
      <div>
        <h6 className="group-card__title mb-1">{name}</h6>
        <small className="group-card__members text-muted">{members} jogadores</small>
      </div>
    </div>
  );
};

const GrupoTelas = () => {
  const [isPublic, setIsPublic] = useState(true);

  const publicGroups = [
    { id: 1, image: "https://via.placeholder.com/150", name: "Galera da Grota", members: 73 },
    { id: 2, image: "https://via.placeholder.com/150", name: "FC BIU", members: 105 },
  ];

  const privateGroups = [
    { id: 1, image: "https://via.placeholder.com/150", name: "O Racha é Realidade", members: 25 },
    { id: 2, image: "https://via.placeholder.com/150", name: "Os Bagunceiros", members: 32 },
  ];

  return (
    <div className="groups-page container mt-4">
      {/* Cabeçalho */}
      <div className="groups-page__header d-flex justify-content-between align-items-center mb-4">
        <h4 className="groups-page__title">Grupos</h4>
        <div className="d-flex">
          <button className="groups-page__btn-search btn btn-light me-2 p-2 rounded-circle">
            <i className="bi bi-search"></i>
          </button>
          <button className="groups-page__btn-add btn btn-light p-2 rounded-circle">
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>

      {/* Toggle de Públicos e Privados */}
      <div className="groups-page__toggle d-flex flex-column align-items-center mb-4">
        <button
          className={`groups-page__toggle-btn btn w-100 mb-2 ${
            isPublic ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setIsPublic(true)}
        >
          Públicos
        </button>
        <button
          className={`groups-page__toggle-btn btn w-100 ${
            !isPublic ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setIsPublic(false)}
        >
          Privados
        </button>
      </div>

      {/* Listagem dos Grupos */}
      <div className="groups-page__list">
        {(isPublic ? publicGroups : privateGroups).map((group) => (
          <GroupCard key={group.id} image={group.image} name={group.name} members={group.members} />
        ))}
      </div>
    </div>
  );
};

export default GrupoTelas;
