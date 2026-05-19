import React from "react";

export function LayerItem({ active, disabled, layer, onToggleLayer }) {
  return (
    <div className="layer-item">
      <div className="layer-name">
        <span className="layer-dot" style={{ background: layer.legendColor }} />
        <span>{layer.name}</span>
      </div>

      <label className="layer-switch" title={`Alternar ${layer.name}`}>
        <input
          checked={active}
          disabled={disabled}
          type="checkbox"
          onChange={event => onToggleLayer(layer.name, event.target.checked)}
        />
        <span className="layer-slider" />
      </label>
    </div>
  );
}
