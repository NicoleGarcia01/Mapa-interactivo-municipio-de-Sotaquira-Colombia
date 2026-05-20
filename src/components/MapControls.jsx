import React from "react";
import { FullscreenButton } from "./FullscreenButton.jsx";

export function MapControls({
  isFullscreen,
  onCenterMap,
  onOpenInfo,
  onToggleFullscreen
}) {
  return (
    <div className="map-controls" aria-label="Controles del mapa">
      <button
        aria-label="Abrir información del visor"
        className="map-control-button"
        title="Información"
        type="button"
        onClick={onOpenInfo}
      >
        <span className="info-icon" aria-hidden="true">i</span>
        <span>Información</span>
      </button>

      <button
        aria-label="Centrar mapa en Sotaquirá"
        className="map-control-button"
        title="Centrar mapa"
        type="button"
        onClick={onCenterMap}
      >
        <span className="center-icon" aria-hidden="true" />
        <span>Centrar mapa</span>
      </button>

      <FullscreenButton
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />
    </div>
  );
}
