const map = L.map('map').setView(MAP_CONFIG.center, MAP_CONFIG.zoom);

const baseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
});

baseMap.addTo(map);