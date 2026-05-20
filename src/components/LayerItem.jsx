import React from "react";

export function LayerItem({ active, disabled, layer, onToggleLayer }) {
  return (
    <div className={`layer-item${active ? " active" : ""}${disabled ? " loading" : ""}`}>
      <div className="layer-name">
        <span
          className="layer-dot"
          style={{
            background: layer.legendColor,
            borderColor: layer.color
          }}
        />
        <span>{layer.name}</span>
      </div>

      <label
        aria-label={`Alternar ${layer.name}`}
        className="layer-switch"
        title={`Alternar ${layer.name}`}
      >
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
