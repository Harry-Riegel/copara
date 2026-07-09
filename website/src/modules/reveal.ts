/** Sanftes Aufsteigen der Sektionen beim Scrollen (.rise → .in).
 *  Bei reduzierter Bewegung sind .rise-Elemente per CSS bereits sichtbar. */
export function initReveal(): void {
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
