import * as React from 'react';

/** Name of a Lucide glyph copied into the Copara icon set (see icons-data.js). */
export type IconName =
  | 'calendar' | 'inbox' | 'info' | 'x' | 'check' | 'check-check'
  | 'chevron-left' | 'chevron-right' | 'chevron-down' | 'plus' | 'clock'
  | 'users' | 'bell' | 'settings' | 'arrow-left-right' | 'send' | 'log-out'
  | 'user' | 'shield' | 'file-text' | 'copy' | 'star' | 'more-horizontal'
  | 'alert-circle' | 'house' | 'list-checks' | 'crown' | 'eye' | 'chart-column'
  | 'user-plus' | 'timer' | 'map-pin' | 'sun' | 'mail' | 'message-circle'
  | 'share' | 'pencil' | 'rotate-ccw' | 'heart-handshake';

export interface IconProps {
  /** Lucide glyph name. */
  name: IconName;
  /** Pixel size (width = height). Default 24; 16–20 in rows, ~23 in the tab bar. */
  size?: number;
  /** Stroke color — pass a token like var(--ink-600). Default currentColor. */
  color?: string;
  /** Stroke width. Default 2 (Lucide outline). */
  strokeWidth?: number;
  style?: React.CSSProperties;
}

/** Lucide outline icon, tinted via `color`. Always paired with a text label. */
export function Icon(props: IconProps): JSX.Element | null;
