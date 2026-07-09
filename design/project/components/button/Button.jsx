import React, { useState } from 'react';

/**
 * Copara Button — Redesign „Warm Sand & Wald": Pillenform.
 * primary = Wald, secondary = Sand, tertiary = Text. Press = opacity 0.8, disabled = 0.4.
 */
export function Button({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  style,
  children,
}) {
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || loading;
  const bg = {
    primary: 'var(--wald-700)',
    secondary: 'var(--sand-100)',
    tertiary: 'transparent',
  }[variant];
  const fg = {
    primary: 'var(--sand-0)',
    secondary: 'var(--ink-900)',
    tertiary: 'var(--ink-600)',
  }[variant];
  const dims = {
    small: { height: 'var(--control-sm)', padding: '0 var(--space-4)', fontSize: 'var(--text-sm-size)' },
    medium: { height: 'var(--control-md)', padding: '0 var(--space-5)', fontSize: 'var(--text-base-size)' },
    large: { height: 'var(--control-lg)', padding: '0 var(--space-6)', fontSize: 'var(--text-base-size)' },
  }[size];
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-body-semibold)',
        cursor: isDisabled ? 'default' : 'pointer',
        opacity: isDisabled ? 'var(--opacity-disabled)' : pressed ? 'var(--opacity-pressed)' : 1,
        transition: 'opacity var(--transition-default)',
        ...dims,
        ...style,
      }}
    >
      {loading ? <Spinner color={variant === 'primary' ? '#FFFDF7' : '#6B675C'} /> : children}
    </button>
  );
}

function Spinner({ color }) {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        border: '2px solid ' + color,
        borderTopColor: 'transparent',
        animation: 'copara-spin 0.8s linear infinite',
        display: 'inline-block',
      }}
    >
      <style>{'@keyframes copara-spin { to { transform: rotate(360deg); } }'}</style>
    </span>
  );
}
