function crearPopup(feature, layer) {
  if (!feature.properties) return;

  let contenido = '<strong>Información</strong><br>';

  Object.keys(feature.properties).forEach(campo => {
    contenido += `<strong>${campo}:</strong> ${feature.properties[campo]}<br>`;
  });

  layer.bindPopup(contenido);
}

async function cargarCapa(layerConfig) {
  const response = await fetch(`data/${layerConfig.file}`);
  const geojson = await response.json();

  const layer = L.geoJSON(geojson, {
    style: layerConfig.style,
    onEachFeature: crearPopup
  });

  if (layerConfig.visible) {
    layer.addTo(map);
  }

  return layer;
}