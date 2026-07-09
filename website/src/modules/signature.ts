import { backOut, clamp01, easeInOut, easeOut, lerp, prefersReducedMotion } from './motion';

/**
 * Signatur-Animation im Hero — spielt genau einmal:
 * Umarmung → Geburt des Punkts → Trennung → Wiederverbindung.
 * Danach lebendiger Halt: nur der Glow atmet.
 * Reduzierte Bewegung: direkt die verbundene Endpose.
 */
export function initSignature(): void {
  const l = document.querySelector<HTMLElement>('[data-sig="l"]');
  const r = document.querySelector<HTMLElement>('[data-sig="r"]');
  const d = document.querySelector<HTMLElement>('[data-sig="d"]');
  if (!l || !r || !d) return;

  const paint = (lx: number, rx: number, sx: number, sy: number, glow: number): void => {
    l.style.transform = `translate3d(${lx}px,0,0)`;
    r.style.transform = `translate3d(${rx}px,0,0)`;
    d.style.transform = `scale(${Math.max(0, sx)},${Math.max(0, sy)})`;
    d.style.opacity = sx <= 0.02 ? '0' : '1';
    const blur = 4 + 9 * sy + 18 * glow;
    const alpha = Math.min(1, 0.25 + 0.45 * sy + 0.5 * glow);
    d.style.boxShadow = `0 0 ${blur}px rgba(232,168,124,${alpha})`;
  };

  // Posen: Überlappung ±10 · Umarmung ±6.5 · getrennt ±46 · verbunden ±28
  const OVERLAP = 10;
  const HUG = 6.5;
  const APART = 46;
  const LINK = 28;
  const DOT = 0.55;
  // Story-Beats in Sekunden
  const T_HUG = 0.55;
  const T_HOLD = 0.9;
  const T_APART = 2.05;
  const T_LONG = 2.55;
  const T_LINK = 3.65;
  const T_END = 5.6;

  if (prefersReducedMotion()) {
    paint(-LINK, LINK, 1, 1, 0);
    return;
  }

  const circleX = (t: number): number => {
    if (t <= 0) return OVERLAP;
    if (t < T_HUG) return lerp(OVERLAP, HUG, easeOut(t / T_HUG));
    if (t < T_HOLD) return HUG;
    if (t < T_APART) return lerp(HUG, APART, easeInOut((t - T_HOLD) / (T_APART - T_HOLD)));
    if (t < T_LONG) return APART;
    if (t < T_LINK) return lerp(APART, LINK, easeInOut((t - T_LONG) / (T_LINK - T_LONG)));
    const s = t - T_LINK; // Micro-Recoil nach dem Kontakt, gedämpft
    return LINK + 1.2 * Math.exp(-s * 5) * Math.sin(s * 16);
  };

  const dotAt = (t: number): { sx: number; sy: number; glow: number } => {
    if (t < 0.12) return { sx: 0, sy: 0, glow: 0 };
    if (t < T_HUG) {
      // Geburt: Pop mit Squash & Stretch + kleiner Funke
      const k = clamp01((t - 0.12) / (T_HUG - 0.12));
      const b = DOT * backOut(k, 2.2);
      return { sx: b * (1 + 0.22 * (1 - k)), sy: b * (1 - 0.18 * (1 - k)), glow: 0.35 * (1 - k) };
    }
    if (t < T_LONG + 0.3) return { sx: DOT, sy: DOT, glow: 0 };
    if (t < T_LINK) {
      // wächst der Annäherung entgegen
      const k = clamp01((t - (T_LONG + 0.3)) / (T_LINK - (T_LONG + 0.3)));
      const g = lerp(DOT, 1, easeOut(k));
      return { sx: g, sy: g, glow: 0 };
    }
    // Kontakt: die Energie geht in den Punkt
    const s = t - T_LINK;
    const osc = Math.exp(-s * 4.5) * Math.cos(s * 14);
    return { sx: 1 - 0.16 * osc, sy: 1 + 0.14 * osc, glow: Math.exp(-s * 2.4) };
  };

  let start: number | null = null;
  let idleStart: number | null = null;

  const idle = (ts: number): void => {
    if (idleStart == null) idleStart = ts;
    const s = (ts - idleStart) / 1000;
    const breath = 0.5 + 0.5 * Math.sin((s * 2 * Math.PI) / 4.2);
    d.style.boxShadow = `0 0 ${12 + 4 * breath}px rgba(232,168,124,${0.55 + 0.18 * breath})`;
    requestAnimationFrame(idle);
  };

  const frame = (ts: number): void => {
    if (start == null) start = ts;
    const t = (ts - start) / 1000;
    const lx = circleX(t);
    const rx = circleX(t - 0.09); // Follow-through: der rechte Kreis zieht minimal nach
    const dot = dotAt(t);
    paint(-lx, rx, dot.sx, dot.sy, dot.glow);
    if (t < T_END) {
      requestAnimationFrame(frame);
    } else {
      paint(-LINK, LINK, 1, 1, 0);
      requestAnimationFrame(idle);
    }
  };

  requestAnimationFrame(frame);
}
