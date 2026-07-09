/** Bestätigungs-Toast — Wald-Pille über der Tab-Bar. */
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

import { colors, fonts, motion, radius, shadows } from '@/theme/tokens';

import { Icon } from './ui/Icon';

export function Toast({ message }: { message: string | null }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [text, setText] = useState(message);

  useEffect(() => {
    if (message) setText(message);
    Animated.timing(progress, {
      toValue: message ? 1 : 0,
      duration: motion.defaultMs,
      easing: Easing.bezier(...motion.easeDefault),
      useNativeDriver: true,
    }).start();
  }, [message, progress]);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        bottom: 104,
        left: 20,
        right: 20,
        alignItems: 'center',
        zIndex: 60,
        opacity: progress,
        transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
      }}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: colors.wald700,
            borderRadius: radius.pill,
            paddingHorizontal: 18,
            paddingVertical: 12,
          },
          shadows.card,
        ]}
      >
        <Icon name="check" size={17} color={colors.onDark} />
        <Text style={{ fontFamily: fonts.body600, fontSize: 14, color: colors.onDark }}>{text}</Text>
      </View>
    </Animated.View>
  );
}
