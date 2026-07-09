/**
 * Copara Chip — kleine Pille für Status & Premium. premium = Gold-Verlauf
 * (immer für Premium-Elemente); die übrigen Töne sind ruhige Soft-Flächen.
 */
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { colors, fonts, gradients, radius } from '@/theme/tokens';

export type ChipTone = 'premium' | 'wald' | 'apricot' | 'schiefer' | 'neutral';

const TONES: Record<Exclude<ChipTone, 'premium'>, { bg: string; fg: string }> = {
  wald: { bg: colors.wald100, fg: colors.wald700 },
  apricot: { bg: colors.apricot100, fg: colors.apricot700 },
  schiefer: { bg: colors.personC100, fg: colors.personC700 },
  neutral: { bg: colors.sand100, fg: colors.ink600 },
};

const BASE: ViewStyle = {
  height: 24,
  paddingHorizontal: 10,
  borderRadius: radius.pill,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  alignSelf: 'flex-start',
};

export function Chip({
  tone = 'neutral',
  style,
  children,
}: {
  tone?: ChipTone;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const label = (fg: string) => (
    <Text
      numberOfLines={1}
      style={{ fontFamily: fonts.body600, fontSize: 11, letterSpacing: 0.44, color: fg }}
    >
      {children}
    </Text>
  );
  if (tone === 'premium') {
    return (
      <LinearGradient
        colors={gradients.premium}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.4 }}
        style={[BASE, style]}
      >
        {label(colors.gold900)}
      </LinearGradient>
    );
  }
  const t = TONES[tone];
  return <View style={[BASE, { backgroundColor: t.bg }, style]}>{label(t.fg)}</View>;
}
