const loadedLayers = {};

function crearControlCapas() {
  const layerList = document.getElementById('layerList');

  if (!layerList) {
    console.error('No existe #layerList');
    return;
  }

  layerList.innerHTML = '';

  LAYERS_CONFIG
    .filter(layerConfig => !layerConfig.fixed)
    .forEach(layerConfig => {
      const layer = loadedLayers[layerConfig.name];

      if (!layer) return;

      const item = document.createElement('div');
      item.className = 'layer-item';

      item.innerHTML = `
        <div class="layer-name">
          <span class="layer-dot" style="background:${layerConfig.legendColor};"></span>
          <span>${layerConfig.name}</span>
        </div>

        <label class="layer-switch">
          <input
            type="checkbox"
            ${layerConfig.visible ? 'checked' : ''}
            data-layer="${layerConfig.name}"
          >
          <span class="layer-slider"></span>
        </label>
      `;

      layerList.appendChild(item);
    });

  layerList.addEventListener('change', event => {
    const input = event.target;
    const layerName = input.dataset.layer;

    if (!layerName) return;

    const layer = loadedLayers[layerName];

    if (!layer) return;

    if (input.checked) {
      layer.addTo(map);
    } else {
      map.removeLayer(layer);
    }
  });
}

async function iniciarApp() {
  let limiteSotaquira = null;

  for (const layerConfig of LAYERS_CONFIG) {
    try {
      const layer = await cargarCapa(layerConfig);

      loadedLayers[layerConfig.name] = layer;

      if (layerConfig.fixed) {
        limiteSotaquira = layer;
      }
    } catch (error) {
      console.error(`Error cargando la capa: ${layerConfig.name}`, error);
    }
  }

  crearControlCapas();

  if (limiteSotaquira) {
    map.fitBounds(limiteSotaquira.getBounds());
  }
}

iniciarApp();