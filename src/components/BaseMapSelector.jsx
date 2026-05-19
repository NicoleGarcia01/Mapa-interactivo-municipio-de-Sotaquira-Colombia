import React from "react";
import { BASEMAPS_CONFIG } from "../config/basemapsConfig.js";

export function BaseMapSelector({ activeBaseMapId, onChangeBaseMap }) {
  return (
    <section className="basemap-selector" aria-label="Selector de mapa base">
      <div className="floating-panel-heading">
        <span>Mapa base</span>
      </div>

      <div className="basemap-options">
        {BASEMAPS_CONFIG.map(baseMap => (
          <button
            aria-pressed={baseMap.id === activeBaseMapId}
            className={baseMap.id === activeBaseMapId ? "active" : ""}
            key={baseMap.id}
            type="button"
            onClick={() => onChangeBaseMap(baseMap.id)}
          >
            {baseMap.name}
          </button>
        ))}
      </div>
    </section>
  );
}
