const TITLE_KEYS = [
  "nombre",
  "name",
  "tipo",
  "categoria",
  "categoría",
  "cobertura",
  "leyenda",
  "nivel_3",
  "nivel_2",
  "nivel_1"
];
const PRIORITY_KEYS = [
  "leyenda",
  "nivel_1",
  "nivel_2",
  "nivel_3",
  "cobertura",
  "categoria",
  "categoría",
  "tipo",
  "clase",
  "subclase",
  "municipio",
  "vereda",
  "area_ha",
  "area",
  "uso",
  "usos_recom"
];
const TECHNICAL_KEY_PATTERNS = [
  /^objectid$/i,
  /^fid$/i,
  /^gid$/i,
  /^id$/i,
  /^globalid$/i,
  /^codigo$/i,
  /^fid[_-]/i,
  /^objectid[_-]/i,
  /^shape/i,
  /^geom/i,
  /^st_/i,
  /^no_?pol/i,
  /^insumo$/i,
  /^apoyo$/i,
  /^confiab/i,
  /^cambio$/i,
  /coord/i,
  /^lat/i,
  /^lon/i,
  /^x$/i,
  /^y$/i
];

const LABEL_OVERRIDES = {
  area: "Área",
  area_ha: "Área",
  acto_admin: "Acto administrativo",
  categoria: "Categoría",
  clase: "Clase",
  cobertura: "Cobertura",
  escala: "Escala",
  fecha_acto: "Fecha del acto",
  fuente: "Fuente",
  leyenda: "Leyenda",
  municipio: "Municipio",
  nivel_1: "Nivel 1",
  nivel_2: "Nivel 2",
  nivel_3: "Nivel 3",
  subclase: "Subclase",
  tipo: "Tipo",
  usos_recom: "Uso recomendado",
  vereda: "Vereda"
};

function normalizeKey(key) {
  return String(key)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isUsefulValue(value) {
  if (value === null || value === undefined) return false;

  const stringValue = String(value).trim();

  return stringValue !== "" && !["null", "undefined", "n/a", "na", "sin dato"].includes(stringValue.toLowerCase());
}

function isTechnicalKey(key) {
  return TECHNICAL_KEY_PATTERNS.some(pattern => pattern.test(key));
}

function toTitleCase(value) {
  return value
    .toLowerCase()
    .replace(/(^|\s)\S/g, letter => letter.toUpperCase());
}

export function formatLabel(key) {
  const normalizedKey = normalizeKey(key);

  if (LABEL_OVERRIDES[normalizedKey]) {
    return LABEL_OVERRIDES[normalizedKey];
  }

  return toTitleCase(
    String(key)
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\s+/g, " ")
      .trim()
  );
}

export function formatValue(key, value) {
  if (typeof value === "number") {
    const normalizedKey = normalizeKey(key);

    if (normalizedKey.includes("area")) {
      return `${value.toLocaleString("es-CO", { maximumFractionDigits: 2 })} ha`;
    }

    return value.toLocaleString("es-CO", { maximumFractionDigits: 2 });
  }

  return String(value).trim();
}

export function getPopupData(properties = {}, layerName) {
  const entries = Object.entries(properties)
    .filter(([key, value]) => !isTechnicalKey(key) && isUsefulValue(value));

  const titleEntry = entries.find(([key]) => TITLE_KEYS.includes(normalizeKey(key)));
  const title = titleEntry ? formatValue(titleEntry[0], titleEntry[1]) : layerName;
  const titleKey = titleEntry?.[0];

  const fields = entries
    .filter(([key]) => key !== titleKey)
    .sort(([firstKey], [secondKey]) => {
      const firstPriority = PRIORITY_KEYS.indexOf(normalizeKey(firstKey));
      const secondPriority = PRIORITY_KEYS.indexOf(normalizeKey(secondKey));
      const safeFirstPriority = firstPriority === -1 ? Number.MAX_SAFE_INTEGER : firstPriority;
      const safeSecondPriority = secondPriority === -1 ? Number.MAX_SAFE_INTEGER : secondPriority;

      return safeFirstPriority - safeSecondPriority;
    })
    .slice(0, 6)
    .map(([key, value]) => ({
      label: formatLabel(key),
      value: formatValue(key, value)
    }));

  return {
    fields,
    title
  };
}
