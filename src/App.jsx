import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BaseMapSelector } from "./components/BaseMapSelector.jsx";
import { CoordinatesDisplay } from "./components/CoordinatesDisplay.jsx";
import { ErrorNotice } from "./components/ErrorNotice.jsx";
import { InfoPanel } from "./components/InfoPanel.jsx";
import { Legend } from "./components/Legend.jsx";
import { LoadingOverlay } from "./components/LoadingOverlay.jsx";
import { MapControls } from "./components/MapControls.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { DEFAULT_BASEMAP_ID } from "./config/basemapsConfig.js";
import { LAYERS_CONFIG } from "./config/layersConfig.js";
import { useLayers } from "./hooks/useLayers.js";

export function App() {
  const appRef = useRef(null);
  const mapElementRef = useRef(null);
  const [activeBaseMapId, setActiveBaseMapId] = useState(DEFAULT_BASEMAP_ID);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;
  });
  const {
    activeLayers,
    activatePrimaryLayers,
    centerMap,
    coordinates,
    deactivateAllLayers,
    invalidateMapSize,
    isLoadingLayers,
    layerLoadErrors,
    loadedLayerNames,
    processedLayerCount,
    totalLayerCount,
    toggleLayer
  } = useLayers(mapElementRef, activeBaseMapId);

  const appClassName = useMemo(
    () => `app${sidebarCollapsed ? " sidebar-closed" : ""}`,
    [sidebarCollapsed]
  );

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await appRef.current?.requestFullscreen();
    } catch (error) {
      console.error("No se pudo cambiar el modo de pantalla completa.", error);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const resizeTimer = window.setTimeout(() => {
      invalidateMapSize();
    }, 320);

    return () => window.clearTimeout(resizeTimer);
  }, [invalidateMapSize, sidebarCollapsed]);

  useEffect(() => {
    const resizeTimer = window.setTimeout(() => {
      invalidateMapSize();
    }, 220);

    return () => window.clearTimeout(resizeTimer);
  }, [invalidateMapSize, isFullscreen]);

  return (
    <div className={appClassName} ref={appRef}>
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
        layers={LAYERS_CONFIG}
        loadedLayerNames={loadedLayerNames}
        onActivatePrimary={activatePrimaryLayers}
        onDeactivateAll={deactivateAllLayers}
        onToggleLayer={toggleLayer}
      />

      <main className="map-shell">
        <div id="map" ref={mapElementRef} />
        <MapControls
          isFullscreen={isFullscreen}
          onCenterMap={centerMap}
          onOpenInfo={() => setInfoPanelOpen(true)}
          onToggleFullscreen={toggleFullscreen}
        />
        <BaseMapSelector
          activeBaseMapId={activeBaseMapId}
          onChangeBaseMap={setActiveBaseMapId}
        />
        <Legend activeLayers={activeLayers} layers={LAYERS_CONFIG} />
        <CoordinatesDisplay coordinates={coordinates} />
        <ErrorNotice errors={layerLoadErrors} />
        <LoadingOverlay
          isLoading={isLoadingLayers}
          processedCount={processedLayerCount}
          totalCount={totalLayerCount}
        />
      </main>

      <InfoPanel
        layers={LAYERS_CONFIG}
        open={infoPanelOpen}
        onClose={() => setInfoPanelOpen(false)}
      />
    </div>
  );
}
