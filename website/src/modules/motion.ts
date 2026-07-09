/** Zentrale Abfrage für reduzierte Bewegung — einmal pro Seitenaufruf. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Easing-Helfer der Signatur-Animationen (aus dem Design-Mockup übernommen). */
export const clamp01 = (t: number): number => (t < 0 ? 0 : t > 1 ? 1 : t);

export const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

export const backOut = (t: number, s = 1.9): number =>
  1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const segment = (p: number, a: number, b: number): number =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));
