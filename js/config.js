const MAP_CONFIG = {
  center: [5.764, -73.247],
  zoom: 11
};

const LAYERS_CONFIG = [

  /* =========================
     LÍMITE MUNICIPAL
  ========================= */

  {
    name: "Mapa Sotaquirá",
    file: "data/mapa_sotaquira.geojson",
    color: "#111827",
    fillColor: "transparent",
    weight: 3,
    fillOpacity: 0,
    visible: true,
    fixed: true,
    legendColor: "#111827"
  },

  /* =========================
     COBERTURAS
  ========================= */

  {
    name: "Territorios agrícolas",
    file: "data/territorios_agricolas.geojson",
    color: "#b08900",
    fillColor: "#f6e27a",
    weight: 1.5,
    fillOpacity: 0.7,
    visible: true,
    legendColor: "#f6e27a"
  },

  {
    name: "Bosques y áreas naturales",
    file: "data/bosques_areas_naturales.geojson",
    color: "#2e7d32",
    fillColor: "#43a047",
    weight: 1.5,
    fillOpacity: 0.6,
    visible: true,
    legendColor: "#43a047"
  },

  {
    name: "Páramos",
    file: "data/Paramos.geojson",
    color: "#0e7490",
    fillColor: "#06b6d4",
    weight: 1.5,
    fillOpacity: 0.6,
    visible: true,
    legendColor: "#06b6d4"
  },

  {
    name: "Montañas estructurales",
    file: "data/montañas_estructurales.geojson",
    color: "#6d4c41",
    fillColor: "#8d6e63",
    weight: 1.5,
    fillOpacity: 0.5,
    visible: false,
    legendColor: "#8d6e63"
  },

  {
    name: "Ríos",
    file: "data/Rios_sotaquira.geojson",
    color: "#1e88e5",
    fillColor: "#42a5f5",
    weight: 2,
    fillOpacity: 0.8,
    visible: true,
    legendColor: "#42a5f5"
  },

  /* =========================
     SUELOS Y RIESGOS
  ========================= */

  {
    name: "Baja fertilidad",
    file: "data/Baja_fertilidad_sotaquira.geojson",
    color: "#8e24aa",
    fillColor: "#ab47bc",
    weight: 1.5,
    fillOpacity: 0.5,
    visible: false,
    legendColor: "#ab47bc"
  },

  {
    name: "Suceptibilidad del suelo",
    file: "data/Suceptibilidad_suelo.geojson",
    color: "#ef6c00",
    fillColor: "#fb8c00",
    weight: 1.5,
    fillOpacity: 0.5,
    visible: false,
    legendColor: "#fb8c00"
  },

  {
    name: "Riesgo edáfico erosión",
    file: "data/Riesgo_edafico_erosion.geojson",
    color: "#c62828",
    fillColor: "#e53935",
    weight: 1.5,
    fillOpacity: 0.5,
    visible: false,
    legendColor: "#e53935"
  },

  {
    name: "Erosión climática",
    file: "data/Erosion_climatica.geojson",
    color: "#c0a000",
    fillColor: "#ffee58",
    weight: 1.5,
    fillOpacity: 0.5,
    visible: false,
    legendColor: "#ffee58"
  },

  {
    name: "Erosión moderada",
    file: "data/Erosion_moderada.geojson",
    color: "#f4511e",
    fillColor: "#ff7043",
    weight: 1.5,
    fillOpacity: 0.5,
    visible: false,
    legendColor: "#ff7043"
  },

  {
    name: "Erosión fuerte",
    file: "data/Erosion_fuerte.geojson",
    color: "#b71c1c",
    fillColor: "#d32f2f",
    weight: 1.5,
    fillOpacity: 0.5,
    visible: false,
    legendColor: "#d32f2f"
  },

  {
    name: "Afectación baja degradación",
    file: "data/afectacion_baja_degradacion.geojson",
    color: "#ef5350",
    fillColor: "#ef5350",
    weight: 1.5,
    fillOpacity: 0.5,
    visible: false,
    legendColor: "#ef5350"
  },

  /* =========================
     FAUNA Y FLORA
  ========================= */

  {
    name: "Tremarctos (oso)",
    file: "data/DataNatalia/Tremarctos (oso).geojson",
    color: "#5d4037",
    fillColor: "#6d4c41",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#6d4c41"
  },

  {
    name: "Vaccinium (planta)",
    file: "data/DataNatalia/Vaccinium (planta).geojson",
    color: "#2e7d32",
    fillColor: "#43a047",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#43a047"
  },

  {
    name: "Amazilia (Ave)",
    file: "data/DataNatalia/Amazilia (Ave).geojson",
    color: "#1565c0",
    fillColor: "#1e88e5",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#1e88e5"
  },

  {
    name: "Cerdocyaan",
    file: "data/DataNatalia/Cerdocyaan.geojson",
    color: "#7b1fa2",
    fillColor: "#8e24aa",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#8e24aa"
  },

  {
    name: "Cerdocyon (zorro)",
    file: "data/DataNatalia/Cerdocyon (zorro).geojson",
    color: "#ef6c00",
    fillColor: "#fb8c00",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#fb8c00"
  },

  {
    name: "Ceroxylon",
    file: "data/DataNatalia/Ceroxylon.geojson",
    color: "#00695c",
    fillColor: "#00897b",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#00897b"
  },

  {
    name: "Leptotila",
    file: "data/DataNatalia/Leptotila.geojson",
    color: "#512da8",
    fillColor: "#673ab7",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#673ab7"
  },

  {
    name: "Micrurus (Serpiente)",
    file: "data/DataNatalia/Micrurus (Serpiente).geojson",
    color: "#b71c1c",
    fillColor: "#c62828",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#c62828"
  },

  {
    name: "Myrcianthes (planta)",
    file: "data/DataNatalia/Myrcianthes (planta).geojson",
    color: "#1b5e20",
    fillColor: "#2e7d32",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#2e7d32"
  },

  {
    name: "Pithecellobium (Planta)",
    file: "data/DataNatalia/Pithecellobium (Planta).geojson",
    color: "#880e4f",
    fillColor: "#ad1457",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#ad1457"
  },

  {
    name: "Quercus (planta)",
    file: "data/DataNatalia/Quercus (planta).geojson",
    color: "#283593",
    fillColor: "#3949ab",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#3949ab"
  },

  {
    name: "Sylvilagus (conejo)",
    file: "data/DataNatalia/Sylvilagus (conejo).geojson",
    color: "#558b2f",
    fillColor: "#7cb342",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#7cb342"
  },

  {
    name: "Tillandsiaa (planta)",
    file: "data/DataNatalia/Tillandsiaa (planta).geojson",
    color: "#e64a19",
    fillColor: "#f4511e",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#f4511e"
  },

  {
    name: "Zonotichia (ave)",
    file: "data/DataNatalia/Zonotichia (ave).geojson",
    color: "#455a64",
    fillColor: "#546e7a",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#546e7a"
  }

];