# Visor Geográfico Sotaquirá

Visor geográfico web para consultar capas territoriales, ambientales, hídricas y de riesgo del municipio de Sotaquirá, Boyacá. El proyecto está construido como una aplicación React moderna sobre Leaflet y usa archivos GeoJSON locales servidos desde `public/data`.

## Tecnologías

- React 18
- Vite
- Leaflet
- JavaScript moderno
- HTML5 y CSS3
- GeoJSON

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

La aplicación queda disponible por defecto en:

```text
http://127.0.0.1:5173/
```

## Build de producción

```bash
npm run build
```

Para revisar el build localmente:

```bash
npm run preview
```

## Estructura del proyecto

```text
src/
├── assets/
├── components/
├── config/
├── hooks/
├── styles/
├── utils/
├── App.jsx
└── main.jsx

public/
└── data/
    ├── base/
    ├── coberturas/
    ├── hidrografia/
    └── riesgos/
```

## Funcionalidades principales

- Mapa interactivo con Leaflet.
- Selector de mapa base: Carto Light, OpenStreetMap, Satélite Esri y Relieve.
- Sidebar responsive con secciones colapsables.
- Buscador de capas por nombre.
- Botones rápidos para activar capas principales o desactivar capas opcionales.
- Límite municipal de Sotaquirá como capa fija no desactivable.
- Leyenda dinámica de capas activas.
- Popups limpios con atributos filtrados y legibles.
- Estructura de datos organizada por categoría.

## Capas incluidas

- Coberturas territoriales.
- Hidrografía.
- Riesgos y erosión.
- Límite municipal de Sotaquirá como referencia base.

## Deploy

El proyecto está configurado para desplegarse en GitHub Pages desde la rama `gh-pages`.

La configuración de Vite usa la ruta base pública del repositorio para que los assets y los GeoJSON funcionen correctamente en producción:

```js
export default defineConfig({
  base: "/Mapa-interactivo-municipio-de-Sotaquira-Colombia/"
});
```

Para generar el build:

```bash
npm run build
```

Para publicar el contenido de `dist` en la rama `gh-pages`:

```bash
npm run deploy
```

## 

Proyecto desarrollado para la visualización geográfica del municipio de Sotaquirá, Boyacá. Capas cartográficas en formato GeoJSON suministradas como datos locales del visor.
