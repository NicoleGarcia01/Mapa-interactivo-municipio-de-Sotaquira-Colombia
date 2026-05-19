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

El proyecto no incluye capas de fauna, flora ni datos de `DataNatalia`.

## Deploy

El proyecto está preparado para desplegarse en GitHub Pages, Vercel o Netlify.

La configuración de Vite usa rutas relativas para que los assets y los GeoJSON funcionen tanto en dominios raíz como en subrutas:

```js
export default defineConfig({
  base: "./"
});
```

## Créditos

Proyecto desarrollado para la visualización geográfica del municipio de Sotaquirá, Boyacá. Capas cartográficas en formato GeoJSON suministradas como datos locales del visor.
