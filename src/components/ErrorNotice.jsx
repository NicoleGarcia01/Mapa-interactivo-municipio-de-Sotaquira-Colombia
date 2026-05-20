import React, { useEffect, useState } from "react";

export function ErrorNotice({ errors }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(false);
  }, [errors.length]);

  if (errors.length === 0 || dismissed) return null;

  return (
    <aside className="error-notice" role="alert">
      <div>
        <strong>No se pudo cargar una capa.</strong>
        <span>El resto del visor sigue disponible.</span>
      </div>
      <button
        aria-label="Cerrar aviso"
        title="Cerrar aviso"
        type="button"
        onClick={() => setDismissed(true)}
      >
        Cerrar
      </button>
    </aside>
  );
}
