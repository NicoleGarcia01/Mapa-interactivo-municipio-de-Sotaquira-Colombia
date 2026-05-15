function crearPopup(feature, layer) {
  if (!feature.properties) return;

  let contenido = '<strong>Información</strong><br>';

  Object.keys(feature.properties).forEach(campo => {
    contenido += `<strong>${campo}:</strong> ${feature.properties[campo]}<br>`;
  });

  layer.bindPopup(contenido);
}

async function cargarCapa(layerConfig) {
  const response = await fetch(layerConfig.file);

  if (!response.ok) {
    throw new Error(`No se pudo cargar: ${layerConfig.file}`);
  }

  const geojson = await response.json();

  const layer = L.geoJSON(geojson, {
    style: {
      color: layerConfig.color,
      fillColor: layerConfig.fillColor,
      weight: layerConfig.weight || 1,
      fillOpacity: layerConfig.fillOpacity ?? 0.5
    },
    onEachFeature: crearPopup
  });

  if (layerConfig.visible) {
    layer.addTo(map);
  }

  return layer;
}