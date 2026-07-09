import React from 'react';
import { LUCIDE_ICONS } from './icons-data.js';

/**
 * Copara Icon — renders a Lucide glyph (copied from lucide-static, matching the
 * app's lucide-react-native set). Outline, 2px stroke, tints via `color`.
 * Icons always accompany a label; they never carry meaning alone.
 */
export function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 2, style }) {
  const inner = LUCIDE_ICONS[name];
  if (!inner) {
    console.warn('[Copara Icon] unknown icon: ' + name);
    return null;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
