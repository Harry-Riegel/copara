/**
 * Copara Input — Label, Fehler; Sand-Fläche. 1px Hairline → 2px Wald-Fokus →
 * 2px Clay-Fehler (nie Rot).
 */
import { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

import { colors, control, fonts, radius, spacing } from '@/theme/tokens';

export function Input({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
}: {
  label?: string;
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  style?: StyleProp<ViewStyle>;
}) {
  const [focused, setFocused] = useState(false);
  const borderWidth = error || focused ? 2 : 1;
  const borderColor = error ? colors.clay500 : focused ? colors.wald500 : colors.sand200;
  return (
    <View style={style}>
      {label ? (
        <Text
          style={{
            fontFamily: fonts.body500,
            fontSize: 14,
            lineHeight: 21,
            color: colors.ink600,
            marginBottom: spacing.s1,
          }}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.ink400}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: control.md,
          // Padding gleicht die Border-Differenz aus, damit der Text nicht springt
          paddingHorizontal: spacing.s4 - (borderWidth - 1),
          borderRadius: radius.sm,
          backgroundColor: colors.sand0,
          borderWidth,
          borderColor,
          fontFamily: fonts.body400,
          fontSize: 16,
          color: colors.ink900,
        }}
      />
      {error ? (
        <Text
          style={{
            fontFamily: fonts.body400,
            fontSize: 14,
            lineHeight: 21,
            color: colors.clay500,
            marginTop: spacing.s1,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
