import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { PopupContent } from "../components/PopupContent.jsx";
import { getBaseMapById } from "../config/basemapsConfig.js";
import { LAYERS_CONFIG, MAP_CONFIG, PRIMARY_LAYER_NAMES } from "../config/layersConfig.js";
import { getPopupData } from "../utils/formatProperties.js";

function createInitialActiveLayers() {
  return LAYERS_CONFIG.reduce((activeLayers, layerConfig) => {
    activeLayers[layerConfig.name] = Boolean(layerConfig.fixed || layerConfig.visible);
    return activeLayers;
  }, {});
}

function setBaseMapLayer(map, baseLayerRef, currentBaseMapIdRef, baseMapId) {
  const baseMap = getBaseMapById(baseMapId);

  if (currentBaseMapIdRef.current === baseMap.id && baseLayerRef.current) return;

  if (baseLayerRef.current) {
    map.removeLayer(baseLayerRef.current);
  }

  const nextBaseLayer = L.tileLayer(baseMap.url, {
    attribution: baseMap.attribution,
    maxZoom: 19
  });

  nextBaseLayer.addTo(map);
  nextBaseLayer.bringToBack();
  baseLayerRef.current = nextBaseLayer;
  currentBaseMapIdRef.current = baseMap.id;
}

function createPopup(feature, layer, layerConfig) {
  if (!feature.properties) return;

  const popupData = getPopupData(feature.properties, layerConfig.name);
  const popupHtml = renderToStaticMarkup(
    React.createElement(PopupContent, {
      fields: popupData.fields,
      title: popupData.title
    })
  );

  layer.bindPopup(popupHtml, {
    className: "modern-popup",
    maxWidth: 320,
    minWidth: 240
  });
}

function getLayerStyle(layerConfig) {
  return {
    color: layerConfig.color,
    fillColor: layerConfig.fillColor,
    fillOpacity: layerConfig.fillOpacity ?? 0.5,
    lineCap: layerConfig.lineCap,
    lineJoin: layerConfig.lineJoin,
    opacity: layerConfig.opacity ?? 0.85,
    weight: layerConfig.weight || 1
  };
}

function getPaneName(layerConfig) {
  const normalizedLayerName = layerConfig.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return `layer-${normalizedLayerName}`;
}

function ensureLayerPane(map, layerConfig) {
  const paneName = getPaneName(layerConfig);
  const pane = map.getPane(paneName) ?? map.createPane(paneName);

  pane.style.zIndex = String(layerConfig.zIndex ?? 450);

  return paneName;
}

function createFeatureInteractions(feature, layer, layerConfig) {
  createPopup(feature, layer, layerConfig);

  if (!layerConfig.hoverStyle || !layer.setStyle) return;

  layer.on({
    mouseover: () => {
      layer.setStyle(layerConfig.hoverStyle);
      layer.bringToFront?.();
    },
    mouseout: () => {
      layer.setStyle(getLayerStyle(layerConfig));
    }
  });
}

function createGeoJsonLayer(map, layerConfig, geojson) {
  const paneName = ensureLayerPane(map, layerConfig);

  return L.geoJSON(geojson, {
    pane: paneName,
    style: getLayerStyle(layerConfig),
    onEachFeature: (feature, layer) => createFeatureInteractions(feature, layer, layerConfig)
  });
}

function applyLayerVisibility(map, leafletLayers, activeLayers) {
  LAYERS_CONFIG.forEach(layerConfig => {
    const leafletLayer = leafletLayers.get(layerConfig.name);

    if (!leafletLayer) return;

    const shouldShowLayer = layerConfig.fixed || Boolean(activeLayers[layerConfig.name]);
    const isVisible = map.hasLayer(leafletLayer);

    if (shouldShowLayer && !isVisible) {
      leafletLayer.addTo(map);
    }

    if (!shouldShowLayer && isVisible) {
      map.removeLayer(leafletLayer);
    }
  });
}

export function useLayers(mapElementRef, activeBaseMapId) {
  const mapRef = useRef(null);
  const baseLayerRef = useRef(null);
  const currentBaseMapIdRef = useRef(null);
  const leafletLayersRef = useRef(new Map());
  const activeLayersRef = useRef(null);
  const [loadedLayerNames, setLoadedLayerNames] = useState(new Set());
  const [activeLayers, setActiveLayers] = useState(createInitialActiveLayers);

  useEffect(() => {
    activeLayersRef.current = activeLayers;
  }, [activeLayers]);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return undefined;

    let mounted = true;
    const map = L.map(mapElementRef.current, {
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
      zoomControl: true
    });

    mapRef.current = map;
    setBaseMapLayer(map, baseLayerRef, currentBaseMapIdRef, activeBaseMapId);

    const loadLayers = async () => {
      let boundaryLayer = null;

      for (const layerConfig of LAYERS_CONFIG) {
        try {
          const response = await fetch(layerConfig.file);

          if (!response.ok) {
            throw new Error(`No se pudo cargar: ${layerConfig.file}`);
          }

          const geojson = await response.json();

          if (!mounted) return;

          const leafletLayer = createGeoJsonLayer(map, layerConfig, geojson);
          leafletLayersRef.current.set(layerConfig.name, leafletLayer);

          if (layerConfig.fixed) {
            boundaryLayer = leafletLayer;
          }

          applyLayerVisibility(map, leafletLayersRef.current, activeLayersRef.current);

          setLoadedLayerNames(previousNames => {
            const nextNames = new Set(previousNames);
            nextNames.add(layerConfig.name);
            return nextNames;
          });
        } catch (error) {
          console.error(`Error cargando la capa: ${layerConfig.name}`, error);
        }
      }

      if (boundaryLayer && boundaryLayer.getBounds().isValid()) {
        map.fitBounds(boundaryLayer.getBounds());
      }

      window.setTimeout(() => {
        map.invalidateSize();
      }, 300);
    };

    loadLayers();

    return () => {
      mounted = false;
      baseLayerRef.current = null;
      currentBaseMapIdRef.current = null;
      leafletLayersRef.current.clear();
      map.remove();
      mapRef.current = null;
    };
  }, [mapElementRef]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    setBaseMapLayer(map, baseLayerRef, currentBaseMapIdRef, activeBaseMapId);
  }, [activeBaseMapId]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    applyLayerVisibility(map, leafletLayersRef.current, activeLayers);
  }, [activeLayers]);

  const toggleLayer = useCallback((layerName, checked) => {
    const layerConfig = LAYERS_CONFIG.find(layer => layer.name === layerName);

    if (!layerConfig || layerConfig.fixed) return;

    setActiveLayers(previousLayers => ({
      ...previousLayers,
      [layerName]: checked
    }));
  }, []);

  const deactivateAllLayers = useCallback(() => {
    setActiveLayers(() =>
      LAYERS_CONFIG.reduce((nextLayers, layerConfig) => {
        nextLayers[layerConfig.name] = Boolean(layerConfig.fixed);
        return nextLayers;
      }, {})
    );
  }, []);

  const activatePrimaryLayers = useCallback(() => {
    setActiveLayers(() =>
      LAYERS_CONFIG.reduce((nextLayers, layerConfig) => {
        nextLayers[layerConfig.name] = Boolean(
          layerConfig.fixed || PRIMARY_LAYER_NAMES.includes(layerConfig.name)
        );
        return nextLayers;
      }, {})
    );
  }, []);

  const invalidateMapSize = useCallback(() => {
    mapRef.current?.invalidateSize();
  }, []);

  return {
    activeLayers,
    activatePrimaryLayers,
    deactivateAllLayers,
    invalidateMapSize,
    loadedLayerNames,
    toggleLayer
  };
}
