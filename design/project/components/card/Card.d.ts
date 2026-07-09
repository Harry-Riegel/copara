import * as React from 'react';

/**
 * @dsCard components/card/card.card.html
 * @startingPoint section="Copara" subtitle="Sand-Fläche, Radius 24 — flach oder weich erhöht" viewport="700x260"
 */
export interface CardProps {
  /** true = warm soft shadow, no border. false = hairline border, no shadow. Never both. */
  elevated?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Content surface: Sand-0 fill, 24px radius. Shadow OR hairline, never both. */
export function Card(props: CardProps): JSX.Element;
