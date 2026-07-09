/** Schalter im Copara-Stil — Wald an, Sand-200 aus, 200ms ruhige Bewegung. */
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable } from 'react-native';

import { colors, motion, radius } from '@/theme/tokens';

export function Toggle({
  value,
  onChange,
  size = 28,
  label,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
  /** Höhe der Pille; Breite und Knopf skalieren mit. */
  size?: number;
  label?: string;
}) {
  const knob = size - 6;
  const width = size + 20;
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: motion.defaultMs,
      easing: Easing.bezier(...motion.easeDefault),
      useNativeDriver: true,
    }).start();
  }, [value, progress]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      onPress={() => onChange(!value)}
      style={{
        width,
        height: size,
        borderRadius: radius.pill,
        backgroundColor: value ? colors.wald700 : colors.sand200,
        justifyContent: 'center',
      }}
    >
      <Animated.View
        style={{
          width: knob,
          height: knob,
          borderRadius: knob / 2,
          backgroundColor: colors.onDark,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 2,
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [3, width - knob - 3],
              }),
            },
          ],
        }}
      />
    </Pressable>
  );
}
