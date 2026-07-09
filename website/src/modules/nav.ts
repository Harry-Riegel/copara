import { prefersReducedMotion } from './motion';

/** Nav-Zustand (Glas-Hintergrund ab 40px) und Hero-Blob-Parallax. */
export function initNav(): void {
  const nav = document.querySelector<HTMLElement>('.site-nav');
  const blobA = document.querySelector<HTMLElement>('.hero-blob.a');
  const blobB = document.querySelector<HTMLElement>('.hero-blob.b');
  const reduce = prefersReducedMotion();

  addEventListener(
    'scroll',
    () => {
      const y = scrollY;
      nav?.classList.toggle('scrolled', y > 40);
      if (!reduce) {
        if (blobA) blobA.style.transform = `translateY(${y * 0.18}px)`;
        if (blobB) blobB.style.transform = `translateY(${y * -0.12}px)`;
      }
    },
    { passive: true },
  );
}
