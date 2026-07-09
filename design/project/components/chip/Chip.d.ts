import * as React from 'react';

/**
 * @dsCard components/chip/chip.card.html
 * @startingPoint section="Copara" subtitle="Status- & Premium-Pille" viewport="700x200"
 */
export interface ChipProps {
  /** premium = Gold gradient (always on Premium items). wald/apricot/schiefer = parent coding. neutral = default. */
  tone?: 'premium' | 'wald' | 'apricot' | 'schiefer' | 'neutral';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Small status / label pill. Premium elements always carry the gold `premium` chip. */
export function Chip(props: ChipProps): JSX.Element;
