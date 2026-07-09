import { backOut, easeInOut, easeOut, lerp, prefersReducedMotion, segment } from './motion';

/**
 * Scroll-Storytelling: die Signatur-Geschichte, gescrubbt über den
 * Scroll-Fortschritt der 340vh-Sektion. Drei Zeilen blenden passend ein.
 * Nur Fallback: Browser mit Scroll-driven Animations fahren die Geschichte
 * rein in CSS (View-Timeline --story in site.css). Reduzierte Bewegung:
 * direkt die Endpose mit letzter Zeile (übernimmt dort ebenfalls CSS).
 */
export function initStory(): void {
  if (CSS.supports('animation-timeline: view()')) return;

  const section = document.querySelector<HTMLElement>('[data-story]');
  const l = document.querySelector<HTMLElement>('[data-story-el="l"]');
  const r = document.querySelector<HTMLElement>('[data-story-el="r"]');
  const d = document.querySelector<HTMLElement>('[data-story-el="d"]');
  const t1 = document.querySelector<HTMLElement>('[data-story-el="t1"]');
  const t2 = document.querySelector<HTMLElement>('[data-story-el="t2"]');
  const t3 = document.querySelector<HTMLElement>('[data-story-el="t3"]');
  if (!section || !l || !r || !d || !t1 || !t2 || !t3) return;

  // Geometrie: Kreis r100, Punkt r22 → Kontakt bei ±122
  const OVERLAP = 44;
  const HUG = 30;
  const APART = 175;
  const LINK = 122;
  const DOT = 0.5;

  const apply = (p: number): void => {
    let x: number;
    let dot: number;
    let glow = 0;

    if (p < 0.18) x = lerp(OVERLAP, HUG, easeOut(segment(p, 0, 0.18)));
    else if (p < 0.3) x = HUG;
    else if (p < 0.55) x = lerp(HUG, APART, easeInOut(segment(p, 0.3, 0.55)));
    else if (p < 0.62) x = APART;
    else if (p < 0.85) x = lerp(APART, LINK, easeInOut(segment(p, 0.62, 0.85)));
    else x = LINK;

    if (p < 0.06) dot = 0;
    else if (p < 0.18) dot = DOT * backOut(segment(p, 0.06, 0.18));
    else if (p < 0.62) dot = DOT;
    else if (p < 0.85) dot = lerp(DOT, 1, backOut(segment(p, 0.62, 0.85), 1.3));
    else {
      dot = 1;
      glow = segment(p, 0.85, 0.95);
    }

    l.style.translate = `${-x}px 0`;
    r.style.translate = `${x}px 0`;
    d.style.scale = `${Math.max(0, dot)}`;
    d.style.opacity = dot <= 0.02 ? '0' : '1';
    const blur = 10 + 30 * dot + 46 * glow;
    const alpha = Math.min(1, 0.3 + 0.4 * dot + 0.3 * glow);
    d.style.boxShadow = `0 0 ${blur}px rgba(232,168,124,${alpha})`;

    t1.style.opacity = p > 0.03 && p < 0.28 ? '1' : '0';
    t2.style.opacity = p > 0.33 && p < 0.58 ? '1' : '0';
    t3.style.opacity = p > 0.72 ? '1' : '0';
  };

  if (prefersReducedMotion()) {
    apply(1);
    return;
  }

  let ticking = false;
  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - innerHeight;
      apply(Math.min(1, Math.max(0, -rect.top / total)));
      ticking = false;
    });
  };

  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
