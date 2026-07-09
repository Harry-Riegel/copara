/**
 * Copara Card — Sand-0-Fläche, Radius 24. elevated = warmer Schatten ODER
 * Hairline, nie beides.
 */
import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { colors, radius, shadows, spacing } from '@/theme/tokens';

export function Card({
  elevated = false,
  style,
  children,
}: {
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.sand0,
          borderRadius: radius.lg,
          padding: spacing.s4,
        },
        elevated
          ? shadows.card
          : { borderWidth: 1, borderColor: colors.sand200 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
