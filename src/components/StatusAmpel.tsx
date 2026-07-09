/**
 * Status-Ampel-Box — die wichtigste Komponente. Feste Anatomie:
 * Punkt + Zustandswort → größte Zeile → Kontextzeile → höchstens ein Knopf.
 * Bedeutung trägt immer Wort + Punkt, die Farbe verstärkt nur.
 */
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { ampel, colors, fonts, motion, radius } from '@/theme/tokens';
import { type } from '@/theme/type';

export type AmpelState = 'clear' | 'soon' | 'now';

export interface AmpelProps {
  state: AmpelState;
  headline: string;
  context?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function StatusAmpel({
  state,
  headline,
  context,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
}: AmpelProps) {
  const skin = ampel[state];
  return (
    <LinearGradient
      colors={skin.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.64, y: 1 }}
      style={{ borderRadius: radius.lg, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 20 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: skin.dot }} />
        <Text style={[type.overline, { color: skin.sub }]}>{skin.word}</Text>
      </View>
      <Text
        style={{
          fontFamily: fonts.heading700,
          fontSize: 27,
          lineHeight: 32,
          letterSpacing: -0.27,
          color: skin.ink,
          marginTop: 12,
          marginBottom: 8,
        }}
      >
        {headline}
      </Text>
      {context ? (
        <Text style={{ fontFamily: fonts.body400, fontSize: 14, lineHeight: 21, color: skin.sub }}>
          {context}
        </Text>
      ) : null}
      {actionLabel ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => ({
            marginTop: 16,
            height: 54,
            borderRadius: radius.pill,
            backgroundColor: state === 'now' ? colors.onDark : colors.wald700,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? motion.pressedOpacity : 1,
          })}
        >
          <Text
            style={{
              fontFamily: fonts.body600,
              fontSize: 16,
              color: state === 'now' ? ampel.now.action700 : colors.onDark,
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
      {secondaryLabel ? (
        <Pressable
          onPress={onSecondary}
          style={({ pressed }) => ({
            marginTop: 10,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? motion.pressedOpacity : 1,
          })}
        >
          <Text style={{ fontFamily: fonts.body500, fontSize: 14, color: skin.sub }}>
            {secondaryLabel}
          </Text>
        </Pressable>
      ) : null}
    </LinearGradient>
  );
}
