import React from "react";

export function ActiveLayersCounter({ activeLayers, layers }) {
  const activeOptionalCount = layers.filter(layer => !layer.fixed && activeLayers[layer.name]).length;

  return (
    <div className="active-layers-counter" role="status" aria-live="polite">
      <span>Capas activas:</span>
      <strong>{activeOptionalCount}</strong>
    </div>
  );
}
