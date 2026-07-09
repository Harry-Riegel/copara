import React from 'react';

/**
 * Copara Avatar — Initialen-Kreis in Eltern-Farbkodierung.
 * Keine Fotos im Produkt; Initialen reichen und bleiben neutral.
 * tone: wald = Elternteil A, apricot = Elternteil B, schiefer = Elternteil C (Patchwork),
 * neutral = Dritte/Bezugspersonen.
 */
export function Avatar({ name = '', tone = 'neutral', size = 34, style }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  const tones = {
    wald: { background: 'var(--wald-100)', color: 'var(--wald-700)' },
    apricot: { background: 'var(--apricot-100)', color: 'var(--apricot-700)' },
    schiefer: { background: 'var(--person-c-100)', color: 'var(--person-c-700)' },
    neutral: { background: 'var(--sand-100)', color: 'var(--ink-600)' },
  }[tone];
  return (
    <span
      aria-label={name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-body-semibold)',
        fontSize: Math.round(size * 0.38),
        ...tones,
        ...style,
      }}
    >
      {initials}
    </span>
  );
}
