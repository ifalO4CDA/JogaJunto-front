import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapaInterativo() {
  const position = [-9.6658, -35.735]; // Coordenadas de Maceió como exemplo.

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Sua localização</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapaInterativo;
