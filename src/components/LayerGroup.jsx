import React from "react";
import { LayerItem } from "./LayerItem.jsx";

export function LayerGroup({
  activeLayers,
  expanded,
  group,
  loadedLayerNames,
  onToggleGroup,
  onToggleLayer
}) {
  const activeCount = group.layers.filter(layer => activeLayers[layer.name]).length;
  const layerCount = group.layers.length;
  const groupContentId = `layer-group-${group.id}`;

  return (
    <section className={`layer-group${expanded ? " expanded" : " collapsed"}`}>
      <button
        aria-controls={groupContentId}
        aria-expanded={expanded}
        className="layer-group-header"
        type="button"
        onClick={() => onToggleGroup(group.id)}
      >
        <span className="group-title-wrap">
          <span aria-hidden="true" className="group-chevron" />
          <span className="group-title">{group.title}</span>
        </span>
        <span className="group-count">{activeCount}/{layerCount}</span>
      </button>

      <div className="layer-group-content" id={groupContentId}>
        <div className="layer-group-list">
          {group.layers.map(layer => (
            <LayerItem
              active={Boolean(activeLayers[layer.name])}
              disabled={!loadedLayerNames.has(layer.name)}
              key={layer.name}
              layer={layer}
              onToggleLayer={onToggleLayer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
