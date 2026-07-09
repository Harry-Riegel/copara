import * as React from 'react';

/**
 * @dsCard components/avatar/avatar.card.html
 * @startingPoint section="Copara" subtitle="Initialen-Kreis in Eltern-Farbkodierung" viewport="700x150"
 */
export interface AvatarProps {
  /** Full name — the first letters of the first two words become the initials. */
  name?: string;
  /** Colour code. wald = parent A, apricot = parent B, schiefer = parent C (patchwork), neutral = third parties. */
  tone?: 'wald' | 'apricot' | 'schiefer' | 'neutral';
  /** Diameter in px. Default 34. */
  size?: number;
  style?: React.CSSProperties;
}

/** Initials circle in parent colour coding — never a photo. */
export function Avatar(props: AvatarProps): JSX.Element;
