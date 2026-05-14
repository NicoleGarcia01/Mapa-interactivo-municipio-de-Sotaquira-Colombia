const MAP_CONFIG = {
  center: [5.76, -73.25],
  zoom: 12
};

const LAYERS_CONFIG = [

  // =========================
  // LÍMITE MUNICIPAL
  // =========================
  {
    name: 'Límite Sotaquirá',
    file: 'mapa_sotaquira.geojson',

    fixed: true,
    visible: true,

    legendColor: '#000000',

    style: {
      color: '#000000',
      weight: 3,
      fillOpacity: 0
    }
  },

  // =========================
  // TERRITORIOS AGRÍCOLAS
  // =========================
  {
    name: 'Territorios agrícolas',
    file: 'territorios_agricolas.geojson',

    fixed: false,
    visible: true,

    legendColor: '#FFE082',

    style: {
      color: '#8A6D00',
      fillColor: '#FFE082',
      weight: 1,
      fillOpacity: 0.35
    }
  },

  // =========================
  // BOSQUES Y ÁREAS NATURALES
  // =========================
  {
    name: 'Bosques y áreas naturales',
    file: 'bosques_areas_naturales.geojson',

    fixed: false,
    visible: true,

    legendColor: '#2E7D32',

    style: {
      color: '#1B5E20',
      fillColor: '#2E7D32',
      weight: 1,
      fillOpacity: 0.35
    }
  },

  // =========================
  // PÁRAMOS
  // =========================
  {
    name: 'Páramos',
    file: 'Paramos.geojson',

    fixed: false,
    visible: true,

    legendColor: '#00ACC1',

    style: {
      color: '#006064',
      fillColor: '#00ACC1',
      weight: 1,
      fillOpacity: 0.35
    }
  },

  // =========================
  // MONTAÑAS ESTRUCTURALES
  // =========================
  {
    name: 'Montañas estructurales',
    file: 'montañas_estructurales.geojson',

    fixed: false,
    visible: false,

    legendColor: '#8D6E63',

    style: {
      color: '#5D4037',
      fillColor: '#8D6E63',
      weight: 1,
      fillOpacity: 0.35
    }
  },

  // =========================
  // RÍOS
  // =========================
  {
    name: 'Ríos',
    file: 'Rios_sotaquira.geojson',

    fixed: false,
    visible: true,

    legendColor: '#2196F3',

    style: {
      color: '#1565C0',
      weight: 2,
      fillOpacity: 0
    }
  },

  // =========================
  // BAJA FERTILIDAD
  // =========================
  {
    name: 'Baja fertilidad',
    file: 'Baja_fertilidad_sotaquira.geojson',

    fixed: false,
    visible: false,

    legendColor: '#AB47BC',

    style: {
      color: '#6A1B9A',
      fillColor: '#AB47BC',
      weight: 1,
      fillOpacity: 0.4
    }
  },

  // =========================
  // SUSCEPTIBILIDAD DEL SUELO
  // =========================
  {
    name: 'Suceptibilidad del suelo',
    file: 'Suceptibilidad_suelo.geojson',

    fixed: false,
    visible: false,

    legendColor: '#FF9800',

    style: {
      color: '#E65100',
      fillColor: '#FF9800',
      weight: 1,
      fillOpacity: 0.4
    }
  },

  // =========================
  // RIESGO EDÁFICO EROSIÓN
  // =========================
  {
    name: 'Riesgo edáfico erosión',
    file: 'Riesgo_edafico_erosion.geojson',

    fixed: false,
    visible: false,

    legendColor: '#D32F2F',

    style: {
      color: '#B71C1C',
      fillColor: '#D32F2F',
      weight: 1,
      fillOpacity: 0.4
    }
  },

  // =========================
  // EROSIÓN CLIMÁTICA
  // =========================
  {
    name: 'Erosión climática',
    file: 'Erosion_climatica.geojson',

    fixed: false,
    visible: false,

    legendColor: '#FFF176',

    style: {
      color: '#F9A825',
      fillColor: '#FFF176',
      weight: 1,
      fillOpacity: 0.4
    }
  },

  // =========================
  // EROSIÓN MODERADA
  // =========================
  {
    name: 'Erosión moderada',
    file: 'Erosion_moderada.geojson',

    fixed: false,
    visible: false,

    legendColor: '#FF7043',

    style: {
      color: '#D84315',
      fillColor: '#FF7043',
      weight: 1,
      fillOpacity: 0.4
    }
  },

  // =========================
  // EROSIÓN FUERTE
  // =========================
  {
    name: 'Erosión fuerte',
    file: 'Erosion_fuerte.geojson',

    fixed: false,
    visible: false,

    legendColor: '#C62828',

    style: {
      color: '#8E0000',
      fillColor: '#C62828',
      weight: 1,
      fillOpacity: 0.45
    }
  },

  // =========================
  // AFECTACIÓN BAJA DEGRADACIÓN
  // =========================
  {
    name: 'Afectación baja degradación',
    file: 'afectacion_baja_degradacion.geojson',

    fixed: false,
    visible: false,

    legendColor: '#EF5350',

    style: {
      color: '#B71C1C',
      fillColor: '#EF5350',
      weight: 1,
      fillOpacity: 0.4
    }
  }

];