import React from "react";

export function FullscreenButton({ isFullscreen, onToggleFullscreen }) {
  return (
    <button
      aria-label={isFullscreen ? "Salir de pantalla completa" : "Activar pantalla completa"}
      aria-pressed={isFullscreen}
      className="map-control-button"
      title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
      type="button"
      onClick={onToggleFullscreen}
    >
      <span className="fullscreen-icon" aria-hidden="true" />
      <span>{isFullscreen ? "Salir" : "Pantalla completa"}</span>
    </button>
  );
}
