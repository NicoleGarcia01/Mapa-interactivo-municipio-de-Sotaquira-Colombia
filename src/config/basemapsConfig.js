export const BASEMAPS_CONFIG = [
  {
    id: "carto-light",
    name: "Carto Light",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  },
  {
    id: "openstreetmap",
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap"
  },
  {
    id: "esri-satellite",
    name: "Satélite Esri",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri"
  },
  {
    id: "relief",
    name: "Relieve",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri"
  }
];

export const DEFAULT_BASEMAP_ID = "carto-light";

export function getBaseMapById(baseMapId) {
  return BASEMAPS_CONFIG.find(baseMap => baseMap.id === baseMapId) ?? BASEMAPS_CONFIG[0];
}
