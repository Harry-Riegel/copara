import * as React from 'react';

/**
 * @dsCard components/button/button.card.html
 * @startingPoint section="Copara" subtitle="Pillen-Button: primary Wald, secondary Sand, tertiary Text" viewport="700x360"
 */
export interface ButtonProps {
  /** primary = Wald fill, secondary = Sand fill, tertiary = text only. Default primary. */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** small 36 / medium 46 / large 56 px height. Default medium. Large = one primary action per screen. */
  size?: 'small' | 'medium' | 'large';
  /** Show a spinner and block clicks. */
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Pill-shaped button. One primary (Wald) action per screen; press dims to 0.8. */
export function Button(props: ButtonProps): JSX.Element;
