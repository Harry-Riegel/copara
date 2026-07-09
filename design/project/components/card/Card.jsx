import React from 'react';

/**
 * Copara Card — „Warm Sand & Wald": Sand-0-Fläche, Radius 24, warmer Soft-Schatten.
 * Karte = Schatten (elevated) ODER Hairline, nie beides.
 */
export function Card({ elevated = false, style, children }) {
  return (
    <div
      style={{
        background: 'var(--sand-0)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        boxShadow: elevated ? 'var(--shadow-card)' : 'none',
        border: elevated ? 'none' : '1px solid var(--sand-200)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
