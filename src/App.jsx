import React, { useEffect, useMemo, useRef, useState } from "react";
import { BaseMapSelector } from "./components/BaseMapSelector.jsx";
import { Legend } from "./components/Legend.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { DEFAULT_BASEMAP_ID } from "./config/basemapsConfig.js";
import { LAYERS_CONFIG } from "./config/layersConfig.js";
import { useLayers } from "./hooks/useLayers.js";

export function App() {
  const mapElementRef = useRef(null);
  const [activeBaseMapId, setActiveBaseMapId] = useState(DEFAULT_BASEMAP_ID);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const {
    activeLayers,
    activatePrimaryLayers,
    deactivateAllLayers,
    invalidateMapSize,
    loadedLayerNames,
    toggleLayer
  } = useLayers(mapElementRef, activeBaseMapId);

  const appClassName = useMemo(
    () => `app${sidebarCollapsed ? " sidebar-closed" : ""}`,
    [sidebarCollapsed]
  );

  useEffect(() => {
    const resizeTimer = window.setTimeout(() => {
      invalidateMapSize();
    }, 320);

    return () => window.clearTimeout(resizeTimer);
  }, [invalidateMapSize, sidebarCollapsed]);

  return (
    <div className={appClassName}>
      <button
        aria-label="Mostrar u ocultar panel"
        aria-pressed={sidebarCollapsed}
        className="sidebar-toggle"
        id="toggleSidebar"
        title="Mostrar u ocultar panel"
        type="button"
        onClick={() => setSidebarCollapsed(previousValue => !previousValue)}
      >
        <span className="sidebar-toggle-icon" aria-hidden="true" />
      </button>

      <Sidebar
        activeLayers={activeLayers}
        collapsed={sidebarCollapsed}
        loadedLayerNames={loadedLayerNames}
        onActivatePrimary={activatePrimaryLayers}
        onDeactivateAll={deactivateAllLayers}
        onToggleLayer={toggleLayer}
      />

      <main className="map-shell">
        <div id="map" ref={mapElementRef} />
        <BaseMapSelector
          activeBaseMapId={activeBaseMapId}
          onChangeBaseMap={setActiveBaseMapId}
        />
        <Legend activeLayers={activeLayers} layers={LAYERS_CONFIG} />
      </main>
    </div>
  );
}
