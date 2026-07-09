import { prefersReducedMotion } from './motion';

/**
 * Kalender-Mock: füllt das Februar-Raster (2026, 1. Feb = Sonntag) und wechselt
 * lebendig durch die Pro-Kind-Sichten. Bei reduzierter Bewegung bleibt die
 * „Alle"-Sicht stehen.
 */
export function initCalendarDemo(): void {
  const grid = document.querySelector<HTMLElement>('[data-cal-grid]');
  const chipWrap = document.querySelector<HTMLElement>('[data-cal-chips]');
  if (!grid || !chipWrap) return;

  const TODAY = 10;
  const locMF = (day: number): string => (day >= 9 && day <= 15 ? 'markus' : 'lisa');
  const locEmma = (day: number): string => (day < 18 ? 'tom' : 'lisa');

  // Raster füllen: 6 Leerzellen (Mo–Sa), dann 28 Tage.
  // --i staggert die Einblende-Kaskade der Szene (site.css).
  for (let i = 0; i < 6; i++) grid.appendChild(document.createElement('div'));
  for (let day = 1; day <= 28; day++) {
    const cell = document.createElement('div');
    cell.className = `d ${locMF(day)}${day === TODAY ? ' today' : ''}`;
    cell.style.setProperty('--i', String(day));
    cell.textContent = String(day);
    grid.appendChild(cell);
  }

  if (prefersReducedMotion()) return;

  const chips = Array.from(chipWrap.querySelectorAll('span'));
  const dayCells = Array.from(grid.children).slice(6) as HTMLElement[];

  const paint = (mode: string): void => {
    chips.forEach((chip) => chip.classList.toggle('on', chip.textContent === mode));
    dayCells.forEach((cell, i) => {
      const day = i + 1;
      const cls = mode === 'Emma' ? locEmma(day) : locMF(day);
      cell.className = `d ${cls}${day === TODAY ? ' today' : ''}`;
    });
  };

  const sequence = ['Alle', 'Mia', 'Emma'];
  let index = 0;
  setInterval(() => {
    // Erst rotieren, wenn die Einblende-Kaskade der Szene gelaufen ist.
    const scene = grid.closest('[data-scene]');
    if (scene && !scene.classList.contains('on')) return;
    index = (index + 1) % sequence.length;
    paint(sequence[index] ?? 'Alle');
  }, 3200);
}
