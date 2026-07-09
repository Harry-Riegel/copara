/**
 * Copara Typo-Presets — Gegenstück zu `window.coparaType` im UI-Kit (shared.jsx).
 * Headlines: Bricolage Grotesque · Body: Inter · Mono: JetBrains Mono.
 */
import { TextStyle } from 'react-native';

import { colors, fonts } from './tokens';

export const type = {
  display: {
    fontFamily: fonts.heading700,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.32,
    color: colors.ink900,
  },
  h1: {
    fontFamily: fonts.heading700,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.75,
    color: colors.ink900,
  },
  h2: {
    fontFamily: fonts.heading600,
    fontSize: 22,
    lineHeight: 29,
    color: colors.ink900,
  },
  h3: {
    fontFamily: fonts.heading600,
    fontSize: 18,
    lineHeight: 23,
    color: colors.ink900,
  },
  body: {
    fontFamily: fonts.body400,
    fontSize: 16,
    lineHeight: 25,
    color: colors.ink900,
  },
  muted: {
    fontFamily: fonts.body400,
    fontSize: 16,
    lineHeight: 25,
    color: colors.ink600,
  },
  sm: {
    fontFamily: fonts.body400,
    fontSize: 14,
    lineHeight: 21,
    color: colors.ink600,
  },
  caption: {
    fontFamily: fonts.body400,
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: 0.24,
    color: colors.ink400,
  },
  overline: {
    fontFamily: fonts.body600,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
  },
} satisfies Record<string, TextStyle>;
