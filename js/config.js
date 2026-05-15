const MAP_CONFIG = {
  center: [5.764, -73.247],
  zoom: 11
};

const LAYERS_CONFIG = [

  /* =========================
     LÍMITE MUNICIPAL
  ========================= */

  {
    name: "Límite Sotaquirá",
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
     CAPAS TERRITORIALES
  ========================= */

  {
    name: "Territorios agrícolas",
    file: "data/territorios_agricolas.geojson",
    color: "#bfa100",
    fillColor: "#f6df6c",
    weight: 1.5,
    fillOpacity: 0.65,
    visible: true,
    legendColor: "#f6df6c"
  },

  {
    name: "Bosques y áreas naturales",
    file: "data/bosques_areas_naturales.geojson",
    color: "#2e7d32",
    fillColor: "#388e3c",
    weight: 1.5,
    fillOpacity: 0.6,
    visible: true,
    legendColor: "#388e3c"
  },

  {
    name: "Páramos",
    file: "data/Paramos.geojson",
    color: "#0097a7",
    fillColor: "#26c6da",
    weight: 2,
    fillOpacity: 0.55,
    visible: true,
    legendColor: "#26c6da"
  },

  {
    name: "Montañas estructurales",
    file: "data/montañas_estructurales.geojson",
    color: "#6d4c41",
    fillColor: "#8d6e63",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#8d6e63"
  },

  {
    name: "Ríos",
    file: "data/Rios_sotaquira.geojson",
    color: "#1e88e5",
    fillColor: "#42a5f5",
    weight: 2,
    fillOpacity: 0.9,
    visible: true,
    legendColor: "#42a5f5"
  },

  /* =========================
     CAPAS DE RIESGO
  ========================= */

  {
    name: "Baja fertilidad",
    file: "data/Baja_fertilidad_sotaquira.geojson",
    color: "#8e24aa",
    fillColor: "#ab47bc",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ab47bc"
  },

  {
    name: "Suceptibilidad del suelo",
    file: "data/Suceptibilidad_suelo.geojson",
    color: "#fb8c00",
    fillColor: "#ff9800",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ff9800"
  },

  {
    name: "Riesgo edáfico erosión",
    file: "data/Riesgo_edafico_erosion.geojson",
    color: "#c62828",
    fillColor: "#e53935",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#e53935"
  },

  {
    name: "Erosión climática",
    file: "data/Erosion_climatica.geojson",
    color: "#f9a825",
    fillColor: "#ffee58",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ffee58"
  },

  {
    name: "Erosión moderada",
    file: "data/Erosion_moderada.geojson",
    color: "#f4511e",
    fillColor: "#ff7043",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ff7043"
  },

  {
    name: "Erosión fuerte",
    file: "data/Erosion_fuerte.geojson",
    color: "#b71c1c",
    fillColor: "#d32f2f",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#d32f2f"
  },

  {
    name: "Afectación baja degradación",
    file: "data/afectacion_baja_degradacion.geojson",
    color: "#ef5350",
    fillColor: "#ef5350",
    weight: 2,
    fillOpacity: 0.55,
    visible: false,
    legendColor: "#ef5350"
  },

  /* =========================
     FAUNA Y FLORA
  ========================= */

  {
    name: "Amazilia (Ave)",
    file: "data/DataNatalia/amazilia_ave.geojson",
    color: "#1565c0",
    fillColor: "#1e88e5",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#1e88e5"
  },

  {
    name: "Cerdocyaan",
    file: "data/DataNatalia/cerdocyaan.geojson",
    color: "#455a64",
    fillColor: "#607d8b",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#607d8b"
  },

  {
    name: "Cerdocyon (zorro)",
    file: "data/DataNatalia/cerdocyon_zorro.geojson",
    color: "#ef6c00",
    fillColor: "#fb8c00",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#fb8c00"
  },

  {
    name: "Ceroxylon",
    file: "data/DataNatalia/ceroxylon.geojson",
    color: "#2e7d32",
    fillColor: "#43a047",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#43a047"
  },

  {
    name: "Leptotila",
    file: "data/DataNatalia/leptotila.geojson",
    color: "#6d4c41",
    fillColor: "#8d6e63",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#8d6e63"
  },

  {
    name: "Micrurus (Serpiente)",
    file: "data/DataNatalia/micrurus_serpiente.geojson",
    color: "#c62828",
    fillColor: "#e53935",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#e53935"
  },

  {
    name: "Myrcianthes (planta)",
    file: "data/DataNatalia/myrcianthes_planta.geojson",
    color: "#7b1fa2",
    fillColor: "#9c27b0",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#9c27b0"
  },

  {
    name: "Pithecellobium (Planta)",
    file: "data/DataNatalia/pithecellobium_planta.geojson",
    color: "#33691e",
    fillColor: "#558b2f",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#558b2f"
  },

  {
    name: "Quercus (planta)",
    file: "data/DataNatalia/quercus_planta.geojson",
    color: "#5d4037",
    fillColor: "#795548",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#795548"
  },

  {
    name: "Sylvilagus (conejo)",
    file: "data/DataNatalia/sylvilagus_conejo.geojson",
    color: "#8d6e63",
    fillColor: "#a1887f",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#a1887f"
  },

  {
    name: "Tillandsiaa (planta)",
    file: "data/DataNatalia/tillandsiaa_planta.geojson",
    color: "#00897b",
    fillColor: "#26a69a",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#26a69a"
  },

  {
    name: "Tremarctos (oso)",
    file: "data/DataNatalia/tremarctos_oso.geojson",
    color: "#5d4037",
    fillColor: "#6d4c41",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#6d4c41"
  },

  {
    name: "Vaccinium (planta)",
    file: "data/DataNatalia/vaccinium_planta.geojson",
    color: "#2e7d32",
    fillColor: "#43a047",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#43a047"
  },

  {
    name: "Zonotichia (ave)",
    file: "data/DataNatalia/zonotichia_ave.geojson",
    color: "#3949ab",
    fillColor: "#5c6bc0",
    weight: 2,
    fillOpacity: 0.8,
    visible: false,
    legendColor: "#5c6bc0"
  }

];