import React, { useEffect, useState } from 'react';

/**
 * Copara Sheet — web port of src/components/ui/Sheet.tsx (parentingapp).
 * Bottom sheet with drag handle, 32px top radius, 320ms reassuring ease.
 * Positioned absolutely — the nearest positioned ancestor is the "screen"
 * (e.g. a phone frame). Backdrop is rgba(42,39,33,0.32), tap to close, no blur.
 */
export function Sheet({ open, onClose, height = '70%', children }) {
  const [visible, setVisible] = useState(open);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    } else {
      setShown(false);
      const t = setTimeout(() => setVisible(false), 320);
      return () => clearTimeout(t);
    }
  }, [open]);
  if (!visible) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
      <div
        onClick={onClose}
        aria-label="Schließen"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--backdrop)',
          opacity: shown ? 1 : 0,
          transition: 'opacity var(--transition-sheet)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height,
          background: 'var(--sand-0)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          boxShadow: 'var(--shadow-sheet)',
          paddingTop: 'var(--space-3)',
          transform: shown ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform var(--transition-sheet)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            alignSelf: 'center',
            width: 40,
            height: 4,
            borderRadius: 999,
            background: 'var(--ink-400)',
            marginBottom: 'var(--space-3)',
          }}
        />
        <div style={{ flex: 1, minHeight: 0, padding: '0 var(--space-4) var(--space-6)', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
