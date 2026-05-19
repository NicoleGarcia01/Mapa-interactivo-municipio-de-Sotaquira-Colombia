import React from "react";

export function PopupContent({ fields, title }) {
  return (
    <article className="popup-card">
      <h3>{title}</h3>

      {fields.length > 0 ? (
        <dl>
          {fields.map(field => (
            <div className="popup-field" key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="popup-empty">Sin atributos disponibles</p>
      )}
    </article>
  );
}
