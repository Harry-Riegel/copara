import * as React from 'react';

/**
 * @dsCard components/banner/banner.card.html
 */
export interface BannerProps {
  /** info = Wald icon, warning = amber icon, error = clay icon. Tone lives ONLY in the icon tint. */
  tone?: 'info' | 'warning' | 'error';
  /** When set, shows a dismiss (x) button. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Inline note on a Sand-100 fill. Error is clay, never red; message copy stays gentle. */
export function Banner(props: BannerProps): JSX.Element;
