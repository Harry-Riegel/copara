/**
 * Copara Button — Pillenform. primary = Wald, secondary = Sand, tertiary = Text.
 * Press = Opacity 0.8, disabled = 0.4. Größen 36 / 46 / 56.
 */
import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { colors, control, fonts, motion, radius, spacing } from '@/theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

const BG: Record<ButtonVariant, string> = {
  primary: colors.wald700,
  secondary: colors.sand100,
  tertiary: 'transparent',
};
const FG: Record<ButtonVariant, string> = {
  primary: colors.sand0,
  secondary: colors.ink900,
  tertiary: colors.ink600,
};
const DIMS: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  small: { height: control.sm, paddingHorizontal: spacing.s4, fontSize: 14 },
  medium: { height: control.md, paddingHorizontal: spacing.s5, fontSize: 16 },
  large: { height: control.lg, paddingHorizontal: spacing.s6, fontSize: 16 },
};

export function Button({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onPress,
  style,
  textStyle,
  children,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: ReactNode;
}) {
  const isDisabled = disabled || loading;
  const dims = DIMS[size];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: dims.height,
          paddingHorizontal: dims.paddingHorizontal,
          borderRadius: radius.pill,
          backgroundColor: BG[variant],
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.s2,
          opacity: isDisabled ? motion.disabledOpacity : pressed ? motion.pressedOpacity : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? colors.onDark : colors.ink600} />
      ) : typeof children === 'string' ? (
        <Text
          style={[
            { fontFamily: fonts.body600, fontSize: dims.fontSize, color: FG[variant] },
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
