import React from "react";

function formatCoordinate(value) {
  return Number(value).toFixed(5);
}

export function CoordinatesDisplay({ coordinates }) {
  return (
    <div className="coordinates-display" aria-live="polite">
      {coordinates ? (
        <>
          <span>Latitud: {formatCoordinate(coordinates.latitude)}</span>
          <span>Longitud: {formatCoordinate(coordinates.longitude)}</span>
        </>
      ) : (
        <span className="coordinates-empty">Coordenadas no disponibles</span>
      )}
    </div>
  );
}
