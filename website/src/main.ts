/** Copara Landingpage — Interaktions-Einstieg. */
import { initCalendarDemo } from './modules/calendar-demo';
import { initMobileMenu } from './modules/mobile-menu';
import { initNav } from './modules/nav';
import { initReveal } from './modules/reveal';
import { initScenes } from './modules/scenes';
import { initStory } from './modules/story';

// Gate für Szenen-Startzustände: ohne JS bleibt alles statisch sichtbar.
document.documentElement.classList.add('js');

initReveal();
initNav();
initMobileMenu();
initScenes();
initStory();
initCalendarDemo();
