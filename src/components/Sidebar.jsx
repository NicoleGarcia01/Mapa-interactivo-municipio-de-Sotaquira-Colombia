import React, { useMemo, useState } from "react";
import { LAYER_GROUPS, LAYERS_CONFIG } from "../config/layersConfig.js";
import { LayerGroup } from "./LayerGroup.jsx";

const OPTIONAL_LAYERS = LAYERS_CONFIG.filter(layer => !layer.fixed);

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function layerMatchesSearch(layerName, normalizedSearch) {
  if (!normalizedSearch) return true;

  const normalizedName = normalizeText(layerName);
  const words = normalizedName.split(/[^a-z0-9]+/).filter(Boolean);

  if (normalizedSearch.length <= 4) {
    return words.some(word => word.startsWith(normalizedSearch));
  }

  return normalizedName.includes(normalizedSearch);
}

export function Sidebar({
  activeLayers,
  collapsed,
  loadedLayerNames,
  onActivatePrimary,
  onDeactivateAll,
  onToggleLayer
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState(
    () => new Set(LAYER_GROUPS.map(group => group.id))
  );

  const normalizedSearch = normalizeText(searchTerm.trim());
  const hasSearch = normalizedSearch.length > 0;

  const filteredGroups = useMemo(() => {
    return LAYER_GROUPS.map(group => {
      const layers = OPTIONAL_LAYERS.filter(layer => {
        const belongsToGroup = layer.group === group.id;
        const matchesSearch = layerMatchesSearch(layer.name, normalizedSearch);

        return belongsToGroup && matchesSearch;
      });

      return {
        ...group,
        layers
      };
    }).filter(group => group.layers.length > 0);
  }, [hasSearch, normalizedSearch]);

  const activeOptionalCount = OPTIONAL_LAYERS.filter(layer => activeLayers[layer.name]).length;

  const toggleGroup = groupId => {
    setExpandedGroups(previousGroups => {
      const nextGroups = new Set(previousGroups);

      if (nextGroups.has(groupId)) {
        nextGroups.delete(groupId);
      } else {
        nextGroups.add(groupId);
      }

      return nextGroups;
    });
  };

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`} id="sidebar">
      <div className="sidebar-content">
        <header className="sidebar-header">
          <div className="sidebar-heading">
            <span className="sidebar-gis-icon" aria-hidden="true">
              <span />
            </span>
            <div className="sidebar-heading-text">
              <h1>Visor Geográfico Sotaquirá</h1>
              <span>Sotaquirá, Boyacá</span>
            </div>
          </div>
          <p>Consulta institucional de capas territoriales, hidrografía y riesgos del municipio.</p>
        </header>

        <div className="sidebar-tools">
          <label className="search-control">
            <span className="sr-only">Buscar capa</span>
            <input
              placeholder="Buscar capa..."
              type="search"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </label>

          <div className="quick-actions">
            <button type="button" onClick={onActivatePrimary}>
              Activar principales
            </button>
            <button type="button" onClick={onDeactivateAll}>
              Desactivar todas
            </button>
          </div>
        </div>

        <section className="layer-panel" aria-label="Capas del visor">
          <div className="panel-heading">
            <h2>Capas</h2>
            <span>{activeOptionalCount}/{OPTIONAL_LAYERS.length} activas</span>
          </div>

          <div className="layer-scroll" id="layerList">
            {filteredGroups.length > 0 ? (
              <div className="layer-groups">
                {filteredGroups.map(group => (
                  <LayerGroup
                    activeLayers={activeLayers}
                    expanded={hasSearch || expandedGroups.has(group.id)}
                    group={group}
                    key={group.id}
                    loadedLayerNames={loadedLayerNames}
                    onToggleGroup={toggleGroup}
                    onToggleLayer={onToggleLayer}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-results">No se encontraron capas</p>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
}
