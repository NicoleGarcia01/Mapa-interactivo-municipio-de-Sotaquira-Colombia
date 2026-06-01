import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { PopupContent } from "../components/PopupContent.jsx";
import { getBaseMapById } from "../config/basemapsConfig.js";
import { LAYERS_CONFIG, MAP_CONFIG, PRIMARY_LAYER_NAMES } from "../config/layersConfig.js";

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

  const popupHtml = renderToStaticMarkup(
    React.createElement(PopupContent, {
      feature,
      layerName: layerConfig.name,
      popupFields: layerConfig.popupFields
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
    fill: layerConfig.fill ?? true,
    fillColor: layerConfig.fillColor,
    fillOpacity: layerConfig.fillOpacity ?? 0.5,
    lineCap: layerConfig.lineCap,
    lineJoin: layerConfig.lineJoin,
    opacity: layerConfig.opacity ?? 0.85,
    weight: layerConfig.weight || 1
  };
}

function getPaneName(layerConfig) {
  if (layerConfig.pane) return layerConfig.pane;

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
  if (layerConfig.interactive !== false) {
    createPopup(feature, layer, layerConfig);
  }

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
    interactive: layerConfig.interactive ?? true,
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
  const boundaryLayerRef = useRef(null);
  const currentBaseMapIdRef = useRef(null);
  const leafletLayersRef = useRef(new Map());
  const activeLayersRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [layerLoadErrors, setLayerLoadErrors] = useState([]);
  const [processedLayerCount, setProcessedLayerCount] = useState(0);
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
    L.control.scale({
      imperial: false,
      metric: true,
      position: "bottomleft"
    }).addTo(map);

    const handleMouseMove = event => {
      setCoordinates({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng
      });
    };

    const handleMouseOut = () => {
      setCoordinates(null);
    };

    map.on("mousemove", handleMouseMove);
    map.on("mouseout", handleMouseOut);

    const loadLayers = async () => {
      let boundaryLayer = null;

      setLayerLoadErrors([]);
      setProcessedLayerCount(0);

      for (const layerConfig of LAYERS_CONFIG) {
        try {
          if (layerConfig.type === "tile") {
            const paneName = ensureLayerPane(map, layerConfig);
            const leafletLayer = L.tileLayer(layerConfig.file, {
              pane: paneName,
              opacity: layerConfig.opacity ?? 0.8,
              maxZoom: layerConfig.maxZoom ?? 18,
              minZoom: layerConfig.minZoom ?? 0,
              bounds: layerConfig.bounds
            });
            
            leafletLayersRef.current.set(layerConfig.name, leafletLayer);
            applyLayerVisibility(map, leafletLayersRef.current, activeLayersRef.current);
            
            setLoadedLayerNames(previousNames => {
              const nextNames = new Set(previousNames);
              nextNames.add(layerConfig.name);
              return nextNames;
            });
            
            setProcessedLayerCount(previousCount => previousCount + 1);
            continue;
          }

          const response = await fetch(layerConfig.file);

          if (!response.ok) {
            throw new Error(`No se pudo cargar: ${layerConfig.file}`);
          }

          const geojson = await response.json();

          if (!mounted) break;

          const leafletLayer = createGeoJsonLayer(map, layerConfig, geojson);
          leafletLayersRef.current.set(layerConfig.name, leafletLayer);

          if (layerConfig.fixed) {
            boundaryLayer = leafletLayer;
            boundaryLayerRef.current = leafletLayer;
          }

          applyLayerVisibility(map, leafletLayersRef.current, activeLayersRef.current);

          setLoadedLayerNames(previousNames => {
            const nextNames = new Set(previousNames);
            nextNames.add(layerConfig.name);
            return nextNames;
          });
        } catch (error) {
          console.error(`Error cargando la capa: ${layerConfig.name}`, error);

          if (mounted) {
            setLayerLoadErrors(previousErrors => [
              ...previousErrors,
              {
                layerName: layerConfig.name,
                message: error.message
              }
            ]);
          }
        } finally {
          if (mounted) {
            setProcessedLayerCount(previousCount => previousCount + 1);
          }
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
      boundaryLayerRef.current = null;
      currentBaseMapIdRef.current = null;
      leafletLayersRef.current.clear();
      map.off("mousemove", handleMouseMove);
      map.off("mouseout", handleMouseOut);
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

  const centerMap = useCallback(() => {
    const map = mapRef.current;

    if (!map) return;

    const boundaryLayer = boundaryLayerRef.current;

    if (boundaryLayer && boundaryLayer.getBounds().isValid()) {
      map.fitBounds(boundaryLayer.getBounds(), {
        padding: [24, 24]
      });
      return;
    }

    map.setView(MAP_CONFIG.center, MAP_CONFIG.zoom);
  }, []);

  return {
    activeLayers,
    activatePrimaryLayers,
    centerMap,
    coordinates,
    deactivateAllLayers,
    invalidateMapSize,
    isLoadingLayers: processedLayerCount < LAYERS_CONFIG.length,
    layerLoadErrors,
    loadedLayerNames,
    processedLayerCount,
    totalLayerCount: LAYERS_CONFIG.length,
    toggleLayer
  };
}
