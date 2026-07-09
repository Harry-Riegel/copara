/**
 * Copara Avatar — Initialen-Kreis in Eltern-Farbkodierung. Keine Fotos.
 * wald = Elternteil A · apricot = B · schiefer = C (Patchwork) · neutral = Dritte.
 */
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { colors, fonts } from '@/theme/tokens';

export type AvatarTone = 'wald' | 'apricot' | 'schiefer' | 'neutral';

const TONES: Record<AvatarTone, { bg: string; fg: string }> = {
  wald: { bg: colors.wald100, fg: colors.wald700 },
  apricot: { bg: colors.apricot100, fg: colors.apricot700 },
  schiefer: { bg: colors.personC100, fg: colors.personC700 },
  neutral: { bg: colors.sand100, fg: colors.ink600 },
};

export function Avatar({
  name = '',
  tone = 'neutral',
  size = 34,
  style,
}: {
  name?: string;
  tone?: AvatarTone;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  const t = TONES[tone];
  return (
    <View
      accessibilityLabel={name}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: t.bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text style={{ fontFamily: fonts.body600, fontSize: Math.round(size * 0.38), color: t.fg }}>
        {initials}
      </Text>
    </View>
  );
}
