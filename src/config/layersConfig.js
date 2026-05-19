const DATA_BASE_URL = `${import.meta.env.BASE_URL}data/`;

function dataPath(filePath) {
  return `${DATA_BASE_URL}${filePath}`;
}

export const MAP_CONFIG = {
  center: [5.764, -73.247],
  zoom: 11
};

export const LAYER_GROUPS = [
  {
    id: "coberturas",
    title: "Coberturas territoriales"
  },
  {
    id: "hidrografia",
    title: "Hidrografía"
  },
  {
    id: "riesgos",
    title: "Riesgos y erosión"
  }
];

export const PRIMARY_LAYER_NAMES = [
  "Territorios agrícolas",
  "Bosques y áreas naturales",
  "Páramos",
  "Ríos"
];

export const LAYERS_CONFIG = [
  {
    name: "Límite Sotaquirá",
    file: dataPath("base/mapa_sotaquira.geojson"),
    color: "#111827",
    fillColor: "transparent",
    weight: 3,
    fillOpacity: 0,
    visible: true,
    fixed: true,
    legendColor: "#111827"
  },
  {
    name: "Territorios agrícolas",
    group: "coberturas",
    file: dataPath("coberturas/territorios_agricolas.geojson"),
    color: "#bfa100",
    fillColor: "#f6df6c",
    weight: 1.5,
    fillOpacity: 0.65,
    visible: true,
    legendColor: "#f6df6c"
  },
  {
    name: "Bosques y áreas naturales",
    group: "coberturas",
    file: dataPath("coberturas/bosques_areas_naturales.geojson"),
    color: "#2e7d32",
    fillColor: "#388e3c",
    weight: 1.5,
    fillOpacity: 0.6,
    visible: true,
    legendColor: "#388e3c"
  },
  {
    name: "Páramos",
    group: "coberturas",
    file: dataPath("coberturas/paramos.geojson"),
    color: "#0097a7",
    fillColor: "#26c6da",
    weight: 2,
    fillOpacity: 0.55,
    visible: true,
    legendColor: "#26c6da"
  },
  {
    name: "Montañas estructurales",
    group: "coberturas",
    file: dataPath("coberturas/montanas_estructurales.geojson"),
    color: "#6d4c41",
    fillColor: "#8d6e63",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#8d6e63"
  },
  {
    name: "Ríos",
    group: "hidrografia",
    file: dataPath("hidrografia/rios_sotaquira.geojson"),
    color: "#1e88e5",
    fillColor: "#42a5f5",
    weight: 2,
    fillOpacity: 0.9,
    visible: true,
    legendColor: "#42a5f5"
  },
  {
    name: "Baja fertilidad",
    group: "riesgos",
    file: dataPath("riesgos/baja_fertilidad_sotaquira.geojson"),
    color: "#8e24aa",
    fillColor: "#ab47bc",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ab47bc"
  },
  {
    name: "Susceptibilidad del suelo",
    group: "riesgos",
    file: dataPath("riesgos/susceptibilidad_suelo.geojson"),
    color: "#fb8c00",
    fillColor: "#ff9800",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ff9800"
  },
  {
    name: "Riesgo edáfico erosión",
    group: "riesgos",
    file: dataPath("riesgos/riesgo_edafico_erosion.geojson"),
    color: "#c62828",
    fillColor: "#e53935",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#e53935"
  },
  {
    name: "Erosión climática",
    group: "riesgos",
    file: dataPath("riesgos/erosion_climatica.geojson"),
    color: "#f9a825",
    fillColor: "#ffee58",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ffee58"
  },
  {
    name: "Erosión moderada",
    group: "riesgos",
    file: dataPath("riesgos/erosion_moderada.geojson"),
    color: "#f4511e",
    fillColor: "#ff7043",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ff7043"
  },
  {
    name: "Erosión fuerte",
    group: "riesgos",
    file: dataPath("riesgos/erosion_fuerte.geojson"),
    color: "#b71c1c",
    fillColor: "#d32f2f",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#d32f2f"
  },
  {
    name: "Afectación baja degradación",
    group: "riesgos",
    file: dataPath("riesgos/afectacion_baja_degradacion.geojson"),
    color: "#ef5350",
    fillColor: "#ef5350",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ef5350"
  }
];
