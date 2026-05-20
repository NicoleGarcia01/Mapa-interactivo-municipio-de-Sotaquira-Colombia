const DATA_BASE_URL = `${import.meta.env.BASE_URL}data/`;

function dataPath(filePath) {
  return `${DATA_BASE_URL}${filePath}`;
}

export const MAP_CONFIG = {
  center: [5.764, -73.247],
  zoom: 11
};

export const CARTOGRAPHIC_PALETTE = {
  boundary: {
    stroke: "#334155",
    fill: "#f8fafc"
  },
  coverage: {
    agricultural: {
      stroke: "#a5792a",
      fill: "#e6c878"
    },
    naturalAreas: {
      stroke: "#4f7f58",
      fill: "#7faa86"
    },
    paramo: {
      stroke: "#4f8f88",
      fill: "#8fc3b8"
    },
    mountains: {
      stroke: "#8a6a4f",
      fill: "#c5a585"
    }
  },
  water: {
    stroke: "#2b8ec6",
    fill: "#8bd5f4"
  },
  risk: {
    lowFertility: {
      stroke: "#9a6a25",
      fill: "#d1a04d"
    },
    soilSusceptibility: {
      stroke: "#b56d2d",
      fill: "#df9a5f"
    },
    edaphicErosion: {
      stroke: "#ad4f3d",
      fill: "#dc7e6c"
    },
    climaticErosion: {
      stroke: "#aa741f",
      fill: "#dfba61"
    },
    moderateErosion: {
      stroke: "#b95f36",
      fill: "#dd875f"
    },
    strongErosion: {
      stroke: "#943a35",
      fill: "#cf625c"
    },
    lowDegradation: {
      stroke: "#ad675f",
      fill: "#d79a91"
    }
  }
};

export const LAYER_GROUPS = [
  {
    id: "coberturas",
    title: "Coberturas territoriales",
    accentColor: CARTOGRAPHIC_PALETTE.coverage.naturalAreas.fill
  },
  {
    id: "hidrografia",
    title: "Hidrografía",
    accentColor: CARTOGRAPHIC_PALETTE.water.stroke
  },
  {
    id: "riesgos",
    title: "Riesgos y erosión",
    accentColor: CARTOGRAPHIC_PALETTE.risk.edaphicErosion.fill
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
    color: CARTOGRAPHIC_PALETTE.boundary.stroke,
    pane: "boundaryPane",
    fill: false,
    fillColor: CARTOGRAPHIC_PALETTE.boundary.fill,
    weight: 2.2,
    opacity: 0.95,
    fillOpacity: 0,
    zIndex: 400,
    hoverStyle: {
      color: "#0f172a",
      weight: 3,
      opacity: 1
    },
    visible: true,
    fixed: true,
    legendColor: CARTOGRAPHIC_PALETTE.boundary.stroke
  },
  {
    name: "Territorios agrícolas",
    group: "coberturas",
    file: dataPath("coberturas/territorios_agricolas.geojson"),
    color: CARTOGRAPHIC_PALETTE.coverage.agricultural.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.coverage.agricultural.fill,
    weight: 1.1,
    opacity: 0.78,
    fillOpacity: 0.4,
    zIndex: 410,
    hoverStyle: {
      weight: 1.7,
      opacity: 0.95,
      fillOpacity: 0.54
    },
    visible: true,
    legendColor: CARTOGRAPHIC_PALETTE.coverage.agricultural.fill
  },
  {
    name: "Bosques y áreas naturales",
    group: "coberturas",
    file: dataPath("coberturas/bosques_areas_naturales.geojson"),
    color: CARTOGRAPHIC_PALETTE.coverage.naturalAreas.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.coverage.naturalAreas.fill,
    weight: 1.1,
    opacity: 0.76,
    fillOpacity: 0.38,
    zIndex: 412,
    hoverStyle: {
      weight: 1.7,
      opacity: 0.94,
      fillOpacity: 0.52
    },
    visible: true,
    legendColor: CARTOGRAPHIC_PALETTE.coverage.naturalAreas.fill
  },
  {
    name: "Páramos",
    group: "coberturas",
    file: dataPath("coberturas/paramos.geojson"),
    color: CARTOGRAPHIC_PALETTE.coverage.paramo.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.coverage.paramo.fill,
    weight: 1.25,
    opacity: 0.78,
    fillOpacity: 0.36,
    zIndex: 414,
    hoverStyle: {
      weight: 1.8,
      opacity: 0.96,
      fillOpacity: 0.5
    },
    visible: true,
    legendColor: CARTOGRAPHIC_PALETTE.coverage.paramo.fill
  },
  {
    name: "Montañas estructurales",
    group: "coberturas",
    file: dataPath("coberturas/montanas_estructurales.geojson"),
    color: CARTOGRAPHIC_PALETTE.coverage.mountains.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.coverage.mountains.fill,
    weight: 1.2,
    opacity: 0.76,
    fillOpacity: 0.32,
    zIndex: 406,
    hoverStyle: {
      weight: 1.75,
      opacity: 0.94,
      fillOpacity: 0.46
    },
    visible: false,
    legendColor: CARTOGRAPHIC_PALETTE.coverage.mountains.fill
  },
  {
    name: "Ríos",
    group: "hidrografia",
    file: dataPath("hidrografia/rios_sotaquira.geojson"),
    color: CARTOGRAPHIC_PALETTE.water.stroke,
    pane: "hydroPane",
    fillColor: CARTOGRAPHIC_PALETTE.water.fill,
    weight: 2.6,
    opacity: 0.92,
    fillOpacity: 0.42,
    zIndex: 500,
    lineCap: "round",
    lineJoin: "round",
    hoverStyle: {
      color: "#1477ad",
      weight: 3.5,
      opacity: 1
    },
    visible: true,
    legendColor: CARTOGRAPHIC_PALETTE.water.stroke
  },
  {
    name: "Baja fertilidad",
    group: "riesgos",
    file: dataPath("riesgos/baja_fertilidad_sotaquira.geojson"),
    color: CARTOGRAPHIC_PALETTE.risk.lowFertility.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.risk.lowFertility.fill,
    weight: 1.35,
    opacity: 0.86,
    fillOpacity: 0.3,
    zIndex: 452,
    hoverStyle: {
      weight: 2,
      opacity: 0.98,
      fillOpacity: 0.44
    },
    visible: false,
    legendColor: CARTOGRAPHIC_PALETTE.risk.lowFertility.fill
  },
  {
    name: "Susceptibilidad del suelo",
    group: "riesgos",
    file: dataPath("riesgos/susceptibilidad_suelo.geojson"),
    color: CARTOGRAPHIC_PALETTE.risk.soilSusceptibility.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.risk.soilSusceptibility.fill,
    weight: 1.45,
    opacity: 0.88,
    fillOpacity: 0.34,
    zIndex: 456,
    hoverStyle: {
      weight: 2.1,
      opacity: 1,
      fillOpacity: 0.48
    },
    visible: false,
    legendColor: CARTOGRAPHIC_PALETTE.risk.soilSusceptibility.fill
  },
  {
    name: "Riesgo edáfico erosión",
    group: "riesgos",
    file: dataPath("riesgos/riesgo_edafico_erosion.geojson"),
    color: CARTOGRAPHIC_PALETTE.risk.edaphicErosion.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.risk.edaphicErosion.fill,
    weight: 1.65,
    opacity: 0.9,
    fillOpacity: 0.36,
    zIndex: 462,
    hoverStyle: {
      weight: 2.25,
      opacity: 1,
      fillOpacity: 0.5
    },
    visible: false,
    legendColor: CARTOGRAPHIC_PALETTE.risk.edaphicErosion.fill
  },
  {
    name: "Erosión climática",
    group: "riesgos",
    file: dataPath("riesgos/erosion_climatica.geojson"),
    color: CARTOGRAPHIC_PALETTE.risk.climaticErosion.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.risk.climaticErosion.fill,
    weight: 1.45,
    opacity: 0.86,
    fillOpacity: 0.32,
    zIndex: 454,
    hoverStyle: {
      weight: 2.05,
      opacity: 0.98,
      fillOpacity: 0.46
    },
    visible: false,
    legendColor: CARTOGRAPHIC_PALETTE.risk.climaticErosion.fill
  },
  {
    name: "Erosión moderada",
    group: "riesgos",
    file: dataPath("riesgos/erosion_moderada.geojson"),
    color: CARTOGRAPHIC_PALETTE.risk.moderateErosion.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.risk.moderateErosion.fill,
    weight: 1.55,
    opacity: 0.88,
    fillOpacity: 0.35,
    zIndex: 458,
    hoverStyle: {
      weight: 2.15,
      opacity: 1,
      fillOpacity: 0.49
    },
    visible: false,
    legendColor: CARTOGRAPHIC_PALETTE.risk.moderateErosion.fill
  },
  {
    name: "Erosión fuerte",
    group: "riesgos",
    file: dataPath("riesgos/erosion_fuerte.geojson"),
    color: CARTOGRAPHIC_PALETTE.risk.strongErosion.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.risk.strongErosion.fill,
    weight: 1.85,
    opacity: 0.92,
    fillOpacity: 0.4,
    zIndex: 466,
    hoverStyle: {
      weight: 2.45,
      opacity: 1,
      fillOpacity: 0.54
    },
    visible: false,
    legendColor: CARTOGRAPHIC_PALETTE.risk.strongErosion.fill
  },
  {
    name: "Afectación baja degradación",
    group: "riesgos",
    file: dataPath("riesgos/afectacion_baja_degradacion.geojson"),
    color: CARTOGRAPHIC_PALETTE.risk.lowDegradation.stroke,
    fillColor: CARTOGRAPHIC_PALETTE.risk.lowDegradation.fill,
    weight: 1.35,
    opacity: 0.84,
    fillOpacity: 0.3,
    zIndex: 450,
    hoverStyle: {
      weight: 1.95,
      opacity: 0.98,
      fillOpacity: 0.44
    },
    visible: false,
    legendColor: CARTOGRAPHIC_PALETTE.risk.lowDegradation.fill
  }
];
