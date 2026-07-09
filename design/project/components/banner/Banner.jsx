import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * Copara Banner — web port of src/components/ui/Banner.tsx (parentingapp).
 * Sand-100 fill; the tone only tints the 18px lucide icon. Error is clay, never red.
 */
export function Banner({ tone = 'info', onDismiss, style, children }) {
  const iconColor = {
    info: '#3E6553',
    warning: '#C4956A',
    error: '#B07060',
  }[tone];
  const iconName = tone === 'info' ? 'info' : 'alert-circle';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        background: 'var(--sand-100)',
        borderRadius: 'var(--radius-sm)',
        padding: 'var(--space-3)',
        ...style,
      }}
    >
      <Icon name={iconName} size={18} color={iconColor} />
      <div
        style={{
          flex: 1,
          margin: '0 var(--space-3)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm-size)',
          lineHeight: 'var(--text-sm-line)',
          color: 'var(--ink-900)',
        }}
      >
        {children}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Schließen"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            color: '#6B675C',
          }}
        >
          <Icon name="x" size={18} />
        </button>
      )}
    </div>
  );
}
