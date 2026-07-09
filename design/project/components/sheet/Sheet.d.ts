import * as React from 'react';

/**
 * @dsCard components/sheet/sheet.card.html
 */
export interface SheetProps {
  /** Controlled open state. */
  open: boolean;
  /** Called on backdrop tap / dismiss. */
  onClose?: () => void;
  /** Sheet height (CSS length or %). Default '70%'. */
  height?: string | number;
  children?: React.ReactNode;
}

/**
 * Bottom sheet: 32px top radius, drag handle, 320ms slow ease, backdrop with no blur.
 * Positions against the nearest positioned ancestor (the phone-frame screen).
 */
export function Sheet(props: SheetProps): JSX.Element | null;
