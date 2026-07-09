/**
 * Mobiles Menü: Öffnen/Schließen, Light-Dismiss und Esc erledigt die
 * native Popover-API. Die Anker-Navigation übernimmt dieses Modul selbst:
 * Browser scrollen bei Fragment-Klicks aus einem offenen Popover das
 * Dokument nicht zuverlässig — also erst schließen, dann gezielt scrollen.
 */
export function initMobileMenu(): void {
  const menu = document.getElementById('mobile-menu');
  if (!(menu instanceof HTMLElement) || typeof menu.hidePopover !== 'function') return;

  menu.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;

    event.preventDefault();
    menu.hidePopover();

    const target = document.querySelector(link.hash);
    requestAnimationFrame(() => {
      // behavior "auto" folgt scroll-behavior aus dem CSS — smooth,
      // bzw. sofort bei prefers-reduced-motion.
      target?.scrollIntoView({ behavior: 'auto' });
      history.pushState(null, '', link.hash);
    });
  });
}
