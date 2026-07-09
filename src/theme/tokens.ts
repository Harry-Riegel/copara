/**
 * Copara Design-Tokens — „Warm Sand & Wald" (Redesign 2026).
 * Quelle: copara-design-system/project/tokens/*.css (Handoff-Bundle).
 * Regel: niemals Rot — Fehler sind Clay. Schatten warm getönt, nie Schwarz.
 */

export const colors = {
  // Wald — Primär / Elternteil A
  wald100: '#DFEFE6',
  wald300: '#8FAE9D',
  wald500: '#3E6553',
  wald700: '#2E4B3F',
  wald900: '#1F332B',

  // Aprikose — Elternteil B / warmer Akzent
  apricot100: '#F4E2D5',
  apricot300: '#DDA98C',
  apricot500: '#C67E5C',
  apricot700: '#8A4E33',

  // Sand — Oberflächen
  sand0: '#FFFFFF',
  sand50: '#FAF8F3',
  sand100: '#F2EDE2',
  sand200: '#EAE4D8',

  // Ink — warmes Text-Trio
  ink900: '#2A2721',
  ink600: '#6B675C',
  ink400: '#A39C8C',

  // Gold — Premium
  gold500: '#D9B36A',
  gold900: '#4A3212',

  // Semantik — nie Rot
  success500: '#3E6553',
  amber500: '#C4956A',
  clay500: '#B07060',

  // Personen-Farben — Schiefer = Elternteil C (Patchwork)
  personC100: '#E7EDF3',
  personC500: '#6F8196',
  personC700: '#46586C',

  // Sonstiges
  onDark: '#FFFDF7',
  backdrop: 'rgba(42, 39, 33, 0.32)',
} as const;

/** Status-Ampel — Bedeutung trägt IMMER Wort + Punkt, die Farbe verstärkt nur. */
export const ampel = {
  now: {
    gradient: ['#D08381', '#B56561'] as const,
    dot: '#FFE0DC',
    ink: '#FFFDF7',
    sub: 'rgba(255, 253, 247, 0.92)',
    word: 'Jetzt zu tun',
    action700: '#B05B57',
  },
  soon: {
    gradient: ['#F6DFC8', '#EFC9A8'] as const,
    dot: '#C98A5A',
    ink: '#7A4A22',
    sub: '#7A4A22',
    word: 'Bald dran',
  },
  clear: {
    gradient: ['#B8C9B1', '#9AB292'] as const,
    dot: '#4E6B56',
    ink: '#2F4638',
    sub: '#37493D',
    word: 'Alles geregelt',
  },
} as const;

/** Gradients (die einzigen erlaubten Verläufe). LinearGradient-Farbpaare. */
export const gradients = {
  premium: ['#C67E5C', '#D9B36A'] as const, // 120°
  hero: ['#2E4B3F', '#41705B'] as const, // 150°
} as const;

export const spacing = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s8: 32,
  s10: 40,
  s12: 48,
  s16: 64,
  s20: 80,
  s24: 96,
} as const;

export const radius = {
  sm: 12, // Inputs, Banner
  md: 16, // Tages-Zellen, kleine Container
  lg: 24, // Karten
  xl: 32, // Sheets (obere Ecken)
  pill: 999, // Buttons, Chips
} as const;

/** Control-Höhen (44px = Mindest-Touch-Target) */
export const control = {
  sm: 36,
  md: 46,
  lg: 56,
} as const;

/** Font-Familien — geladen via @expo-google-fonts in app/_layout. */
export const fonts = {
  heading500: 'BricolageGrotesque_500Medium',
  heading600: 'BricolageGrotesque_600SemiBold',
  heading700: 'BricolageGrotesque_700Bold',
  body400: 'Inter_400Regular',
  body500: 'Inter_500Medium',
  body600: 'Inter_600SemiBold',
  mono400: 'JetBrainsMono_400Regular',
} as const;

/** Warme Schatten — nie Schwarz. RN-Approximation der CSS-Tokens. */
export const shadows = {
  card: {
    shadowColor: '#4A3A21',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
  sheet: {
    shadowColor: '#322814',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 16,
  },
  fab: {
    shadowColor: '#2E4B3F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

/** Motion — langsam und beruhigend. Keine Bounces, keine Loops. */
export const motion = {
  defaultMs: 200,
  sheetMs: 320,
  // cubic-bezier(0.32, 0.72, 0, 1) / cubic-bezier(0.16, 1, 0.3, 1)
  easeDefault: [0.32, 0.72, 0, 1] as const,
  easeSheet: [0.16, 1, 0.3, 1] as const,
  pressedOpacity: 0.8,
  disabledOpacity: 0.4,
} as const;
