import React from "react";
import { getPopupData } from "../utils/formatProperties.js";

export function PopupContent({ feature, fields: providedFields, layerName, popupFields, title: providedTitle }) {
  const popupData =
    providedFields && providedTitle
      ? {
          fields: providedFields,
          title: providedTitle
        }
      : getPopupData(feature?.properties, layerName, popupFields);
  const { fields, title } = popupData;

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
