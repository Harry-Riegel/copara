import React from 'react';

/**
 * Copara Chip — kleine Pille für Status & Premium-Kennzeichnung.
 * premium = warmer Gold-Verlauf (immer für Premium-Elemente); die übrigen Töne sind ruhige Soft-Flächen.
 */
export function Chip({ tone = 'neutral', style, children }) {
  const tones = {
    premium: { background: 'var(--premium-gradient)', color: 'var(--gold-900)' },
    wald: { background: 'var(--wald-100)', color: 'var(--wald-700)' },
    apricot: { background: 'var(--apricot-100)', color: 'var(--apricot-700)' },
    schiefer: { background: 'var(--person-c-100)', color: 'var(--person-c-700)' },
    neutral: { background: 'var(--sand-100)', color: 'var(--ink-600)' },
  }[tone];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        height: 24,
        padding: '0 10px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        fontWeight: 'var(--weight-body-semibold)',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        ...tones,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
