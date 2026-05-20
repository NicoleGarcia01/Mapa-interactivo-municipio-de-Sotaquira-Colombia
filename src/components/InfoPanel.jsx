import React, { useEffect, useRef } from "react";

export function InfoPanel({ layers, open, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = event => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  const optionalLayerCount = layers.filter(layer => !layer.fixed).length;

  return (
    <div className="info-panel-overlay" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="info-panel-title"
        aria-modal="true"
        className="info-panel"
        role="dialog"
        onMouseDown={event => event.stopPropagation()}
      >
        <header className="info-panel-header">
          <div>
            <span>Información</span>
            <h2 id="info-panel-title">Visor Geográfico Sotaquirá</h2>
          </div>
          <button
            aria-label="Cerrar panel de información"
            className="info-panel-close"
            ref={closeButtonRef}
            title="Cerrar"
            type="button"
            onClick={onClose}
          >
            Cerrar
          </button>
        </header>

        <div className="info-panel-body">
          <dl className="info-summary">
            <div>
              <dt>Municipio</dt>
              <dd>Sotaquirá, Boyacá</dd>
            </div>
            <div>
              <dt>Capas disponibles</dt>
              <dd>{optionalLayerCount} capas temáticas y límite municipal fijo</dd>
            </div>
            <div>
              <dt>Fuente</dt>
              <dd>Archivos GeoJSON locales organizados por categoría temática.</dd>
            </div>
          </dl>

          <p>
            Herramienta web para consultar información territorial, hidrografía y riesgos del
            municipio con navegación interactiva, leyenda dinámica y consulta de atributos.
          </p>

          <div className="info-panel-section">
            <h3>Uso recomendado</h3>
            <p>
              Apoyo a consulta institucional, revisión cartográfica preliminar y presentación
              pública de información geográfica municipal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
