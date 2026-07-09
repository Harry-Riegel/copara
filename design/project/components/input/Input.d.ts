import * as React from 'react';

/**
 * @dsCard components/input/input.card.html
 */
export interface InputProps {
  /** Optional label above the field (Inter medium, ink-600). */
  label?: string;
  /** Error text below the field. Sets a 2px clay border — never red. */
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

/** Text field: Sand fill, hairline border, 2px Wald focus, 2px clay error. */
export function Input(props: InputProps): JSX.Element;
