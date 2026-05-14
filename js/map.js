const map = L.map('map', {
  center: MAP_CONFIG.center,
  zoom: MAP_CONFIG.zoom,
  zoomControl: true
});

const baseMap = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap'
  }
);

baseMap.addTo(map);

setTimeout(() => {
  map.invalidateSize();
}, 300);