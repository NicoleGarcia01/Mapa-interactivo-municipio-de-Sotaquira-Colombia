import React, { useState } from "react";

export function Legend({ activeLayers, layers }) {
  const [collapsed, setCollapsed] = useState(false);
  const visibleLayers = layers.filter(layer => !layer.fixed && activeLayers[layer.name]);

  return (
    <section className={`legend-panel${collapsed ? " collapsed" : ""}`} aria-label="Leyenda de capas activas">
      <button
        aria-expanded={!collapsed}
        className="legend-header"
        type="button"
        onClick={() => setCollapsed(previousValue => !previousValue)}
      >
        <span>Leyenda</span>
        <span className="legend-count">{visibleLayers.length}</span>
      </button>

      <div className="legend-content">
        {visibleLayers.length > 0 ? (
          <ul>
            {visibleLayers.map(layer => (
              <li key={layer.name}>
                <span className="legend-swatch" style={{ background: layer.legendColor }} />
                <span>{layer.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay capas activas</p>
        )}
      </div>
    </section>
  );
}
