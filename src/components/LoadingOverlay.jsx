import React from "react";

export function LoadingOverlay({ isLoading, processedCount, totalCount }) {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-card">
        <span className="loading-spinner" aria-hidden="true" />
        <div>
          <strong>Cargando información geográfica...</strong>
          <span>
            {processedCount}/{totalCount} capas procesadas
          </span>
        </div>
      </div>
    </div>
  );
}
