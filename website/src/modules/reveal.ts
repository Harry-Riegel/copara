/** Sanftes Aufsteigen der Sektionen beim Scrollen (.rise → .in).
 *  Nur Fallback: Browser mit Scroll-driven Animations (Chrome, Safari 26+)
 *  erledigen das rein in CSS (site.css, @supports-Block). Bei reduzierter
 *  Bewegung sind .rise-Elemente per CSS bereits sichtbar. */
export function initReveal(): void {
  if (CSS.supports('animation-timeline: view()')) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('in');
      }
    },
    { threshold: 0.18 },
  );
  document.querySelectorAll('.rise').forEach((el) => observer.observe(el));
}
