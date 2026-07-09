/**
 * Grafik-Szenen: sobald eine Grafik ins Blickfeld kommt, startet ihre
 * einmalige Choreografie (.on — die Keyframes liegen in site.css).
 * Ohne JavaScript bleibt alles statisch sichtbar (html.js-Gate).
 */
export function initScenes(): void {
  const scenes = document.querySelectorAll('[data-scene]');
  if (!scenes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.35 },
  );
  scenes.forEach((scene) => observer.observe(scene));
}
