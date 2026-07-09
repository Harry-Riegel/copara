import { prefersReducedMotion } from './motion';

/**
 * Kalender-Mock: füllt das Februar-Raster (2026, 1. Feb = Sonntag) und
 * erzählt die Tausch-Story — über Freitag, dem 13. (Markus-Woche) steht
 * „Tauschen?", nach dem Tipp gehört der Tag Lisa („Getauscht.").
 * Danach wechselt die Demo lebendig durch die Pro-Kind-Sichten.
 * Bei reduzierter Bewegung bleibt die „Alle"-Sicht ohne Story stehen.
 */
export function initCalendarDemo(): void {
  const grid = document.querySelector<HTMLElement>('[data-cal-grid]');
  const chipWrap = document.querySelector<HTMLElement>('[data-cal-chips]');
  if (!grid || !chipWrap) return;

  const TODAY = 10;
  const SWAP_DAY = 13; // Freitag in Markus' Woche — der Tag, der getauscht wird
  let swapped = false;

  const locMF = (day: number): string => {
    if (swapped && day === SWAP_DAY) return 'lisa';
    return day >= 9 && day <= 15 ? 'markus' : 'lisa';
  };
  const locEmma = (day: number): string => (day < 18 ? 'tom' : 'lisa');

  // Raster füllen: 6 Leerzellen (Mo–Sa), dann 28 Tage.
  // --i staggert die Einblende-Kaskade der Szene (site.css).
  for (let i = 0; i < 6; i++) grid.appendChild(document.createElement('div'));
  for (let day = 1; day <= 28; day++) {
    const cell = document.createElement('div');
    cell.className = `d ${locMF(day)}${day === TODAY ? ' today' : ''}`;
    cell.style.setProperty('--i', String(day));
    cell.textContent = String(day);
    if (day === SWAP_DAY) {
      cell.classList.add('swap-day');
      const chip = document.createElement('span');
      chip.className = 'swap-chip';
      chip.innerHTML = '<i>Tauschen?</i><b>Getauscht.</b>';
      cell.append(chip);
    }
    grid.appendChild(cell);
  }

  if (prefersReducedMotion()) return;

  const scene = grid.closest('[data-scene]');
  const swapCell = grid.querySelector<HTMLElement>('.swap-day');

  // Tausch-Story: startet, sobald die Szene sichtbar wird (.on durch scenes.ts).
  if (scene && swapCell) {
    const runStory = (): void => {
      // Tipp bei 2,8s (cell-tap in site.css), Farbwechsel kurz danach.
      setTimeout(() => {
        swapped = true;
        swapCell.classList.remove('markus');
        swapCell.classList.add('lisa', 'swapped');
      }, 3150);
      // Erst wenn die Story erzählt ist, darf die Pro-Kind-Rotation übernehmen.
      setTimeout(() => scene.setAttribute('data-settled', ''), 5600);
    };

    if (scene.classList.contains('on')) {
      runStory();
    } else {
      const observer = new MutationObserver(() => {
        if (!scene.classList.contains('on')) return;
        observer.disconnect();
        runStory();
      });
      observer.observe(scene, { attributes: true, attributeFilter: ['class'] });
    }
  }

  const chips = Array.from(chipWrap.querySelectorAll('span'));
  const dayCells = Array.from(grid.children).slice(6) as HTMLElement[];

  const paint = (mode: string): void => {
    chips.forEach((chip) => chip.classList.toggle('on', chip.textContent === mode));
    dayCells.forEach((cell, i) => {
      const day = i + 1;
      const cls = mode === 'Emma' ? locEmma(day) : locMF(day);
      // Farbklassen tauschen, Story-Klassen (swap-day, swapped, today) erhalten.
      cell.classList.remove('lisa', 'markus', 'tom');
      cell.classList.add(cls);
    });
  };

  const sequence = ['Alle', 'Mia', 'Emma'];
  let index = 0;
  setInterval(() => {
    // Rotation erst, wenn die Tausch-Story erzählt ist.
    if (scene && !scene.hasAttribute('data-settled')) return;
    index = (index + 1) % sequence.length;
    paint(sequence[index] ?? 'Alle');
  }, 3200);
}
