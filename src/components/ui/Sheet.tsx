/**
 * Copara Sheet — Bottom-Sheet mit Drag-Handle, 32px oberer Radius,
 * 320ms beruhigender Ease. Backdrop rgba(42,39,33,0.32), Tipp schließt, kein Blur.
 */
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { colors, motion, radius, shadows, spacing } from '@/theme/tokens';

const EASE = Easing.bezier(...motion.easeSheet);

export function Sheet({
  open,
  onClose,
  height = 0.7,
  scrollable = true,
  contentStyle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  /** Anteil der Bildschirmhöhe (0–1). */
  height?: number;
  /** false = Inhalt layoutet selbst (z. B. mit marginTop: 'auto'-Fußzeile). */
  scrollable?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}) {
  const { height: screenH } = useWindowDimensions();
  const sheetH = Math.round(screenH * height);
  const [visible, setVisible] = useState(open);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      setVisible(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: motion.sheetMs,
        easing: EASE,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: motion.sheetMs,
        easing: EASE,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [open, progress]);

  if (!visible) return null;

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetH, 0],
  });

  const inner = (
    <>
      <View
        style={{
          alignSelf: 'center',
          width: 40,
          height: 4,
          borderRadius: radius.pill,
          backgroundColor: colors.ink400,
          marginBottom: spacing.s3,
        }}
      />
      {scrollable ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            { paddingHorizontal: spacing.s4, paddingBottom: spacing.s6 },
            contentStyle,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            { flex: 1, paddingHorizontal: spacing.s4, paddingBottom: spacing.s6 },
            contentStyle,
          ]}
        >
          {children}
        </View>
      )}
    </>
  );

  return (
    <Modal transparent visible statusBarTranslucent onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.backdrop,
            opacity: progress,
          }}
        >
          <Pressable accessibilityLabel="Schließen" style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: sheetH,
              backgroundColor: colors.sand0,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              paddingTop: spacing.s3,
              transform: [{ translateY }],
            },
            shadows.sheet,
          ]}
        >
          {inner}
        </Animated.View>
      </View>
    </Modal>
  );
}
