/**
 * Copara Banner — info / warning / error. Sand-100-Fläche; der Ton tintet nur
 * das 18px-Icon. Fehler ist Clay, nie Rot.
 */
import { ReactNode } from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme/tokens';

import { Icon } from './Icon';

export type BannerTone = 'info' | 'warning' | 'error';

const ICON_COLOR: Record<BannerTone, string> = {
  info: colors.success500,
  warning: colors.amber500,
  error: colors.clay500,
};

export function Banner({
  tone = 'info',
  onDismiss,
  style,
  children,
}: {
  tone?: BannerTone;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: colors.sand100,
          borderRadius: radius.sm,
          padding: spacing.s3,
        },
        style,
      ]}
    >
      <Icon name={tone === 'info' ? 'info' : 'alert-circle'} size={18} color={ICON_COLOR[tone]} />
      <Text
        style={{
          flex: 1,
          marginHorizontal: spacing.s3,
          fontFamily: fonts.body400,
          fontSize: 14,
          lineHeight: 21,
          color: colors.ink900,
        }}
      >
        {children}
      </Text>
      {onDismiss ? (
        <Pressable accessibilityLabel="Schließen" onPress={onDismiss} hitSlop={8}>
          <Icon name="x" size={18} color={colors.ink600} />
        </Pressable>
      ) : null}
    </View>
  );
}
