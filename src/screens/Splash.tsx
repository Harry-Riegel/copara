/**
 * Startbildschirm im Website-Hero-Cut. Signatur-Animation, handanimiert
 * (requestAnimationFrame), spielt GENAU EINMAL: Umarmung → Geburt des Punkts →
 * Trennung → Wiederverbindung. Die Kreise berühren nur den Punkt, nie einander.
 * Danach ein lebendiger Halt (nur der Glow atmet).
 */
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

import { colors, fonts, motion, radius } from '@/theme/tokens';

const CREAM = '#F4EFE6';
const NIGHT = '#14211B';
const APRICOT = '#E8A87C';

// Posen: Überlappung ±14 · Umarmung ±9 · getrennt ±64 · verbunden ±39 (Kontakt am Punkt)
const OVERLAP = 14;
const HUG = 9;
const APART = 64;
const LINK = 39;
const DOT_S = 0.55;
// Story-Beats in Sekunden — spielt einmal, keine Wiederholung
const T_HUG = 0.55;
const T_HOLD = 0.9;
const T_APART = 2.05;
const T_LONG = 2.55;
const T_LINK = 3.65;
const T_END = 5.6;

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const backOut = (t: number, s = 2.2) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const circleX = (t: number) => {
  if (t <= 0) return OVERLAP;
  if (t < T_HUG) return lerp(OVERLAP, HUG, easeOut(t / T_HUG));
  if (t < T_HOLD) return HUG;
  if (t < T_APART) return lerp(HUG, APART, easeInOut((t - T_HOLD) / (T_APART - T_HOLD)));
  if (t < T_LONG) return APART;
  if (t < T_LINK) return lerp(APART, LINK, easeInOut((t - T_LONG) / (T_LINK - T_LONG)));
  const s = t - T_LINK; // Micro-Recoil nach dem Kontakt, gedämpft
  return LINK + 1.6 * Math.exp(-s * 5) * Math.sin(s * 16);
};

const dotAt = (t: number) => {
  if (t < 0.12) return { sx: 0, sy: 0, glow: 0 };
  if (t < T_HUG) {
    // Geburt: Pop mit Squash & Stretch + kleiner Funke
    const k = clamp01((t - 0.12) / (T_HUG - 0.12));
    const b = DOT_S * backOut(k);
    return { sx: b * (1 + 0.22 * (1 - k)), sy: b * (1 - 0.18 * (1 - k)), glow: 0.35 * (1 - k) };
  }
  if (t < T_LONG + 0.3) return { sx: DOT_S, sy: DOT_S, glow: 0 };
  if (t < T_LINK) {
    // wächst der Annäherung entgegen
    const k = clamp01((t - (T_LONG + 0.3)) / (T_LINK - (T_LONG + 0.3)));
    const g = lerp(DOT_S, 1, easeOut(k));
    return { sx: g, sy: g, glow: 0 };
  }
  // Kontakt: die Energie geht in den Punkt — Squash, Nachschwingen, Glow-Flare
  const s = t - T_LINK;
  const osc = Math.exp(-s * 4.5) * Math.cos(s * 14);
  return { sx: 1 - 0.16 * osc, sy: 1 + 0.14 * osc, glow: Math.exp(-s * 2.4) };
};

function FadeUp({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 600,
      delay,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      useNativeDriver: true,
    }).start();
  }, [progress, delay]);
  return (
    <Animated.View
      style={{
        opacity: progress,
        transform: [
          { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}

export function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const fade = useRef(new Animated.Value(1)).current;
  const leftX = useRef(new Animated.Value(-OVERLAP)).current;
  const rightX = useRef(new Animated.Value(OVERLAP)).current;
  const dotSx = useRef(new Animated.Value(0)).current;
  const dotSy = useRef(new Animated.Value(0)).current;
  const dotOpacity = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const leavingRef = useRef(false);

  const enter = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    Animated.timing(fade, {
      toValue: 0,
      duration: 440,
      easing: Easing.bezier(...motion.easeDefault),
      useNativeDriver: true,
    }).start(onDone);
  };

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    let idleStart: number | null = null;

    const paint = (l: number, r: number, sx: number, sy: number, glowExtra: number) => {
      leftX.setValue(-l);
      rightX.setValue(r);
      dotSx.setValue(Math.max(0.001, sx));
      dotSy.setValue(Math.max(0.001, sy));
      dotOpacity.setValue(sx <= 0.02 ? 0 : 1);
      glow.setValue(Math.min(1, 0.25 + 0.45 * sy + glowExtra * 0.5));
    };

    const idle = (ts: number) => {
      // lebendiger Halt: nur der Glow atmet — keine Wiederholung der Geschichte
      if (idleStart == null) idleStart = ts;
      const s = (ts - idleStart) / 1000;
      const b = 0.5 + 0.5 * Math.sin((s * 2 * Math.PI) / 4.2);
      glow.setValue(0.55 + 0.18 * b);
      raf = requestAnimationFrame(idle);
    };
    const frame = (ts: number) => {
      if (start == null) start = ts;
      const t = (ts - start) / 1000;
      const lx = circleX(t);
      const rx = circleX(t - 0.09); // Follow-through: der rechte Kreis zieht minimal nach
      const d = dotAt(t);
      paint(lx, rx, d.sx, d.sy, d.glow);
      if (t < T_END) {
        raf = requestAnimationFrame(frame);
      } else {
        paint(LINK, LINK, 1, 1, 0);
        raf = requestAnimationFrame(idle);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [leftX, rightX, dotSx, dotSy, dotOpacity, glow]);

  return (
    <Animated.View
      pointerEvents={leaving ? 'none' : 'auto'}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: NIGHT,
        overflow: 'hidden',
        zIndex: 200,
        opacity: fade,
        paddingHorizontal: 26,
      }}
    >
      {/* Farb-Blobs */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -140,
          right: -150,
          width: 360,
          height: 360,
          borderRadius: 180,
          backgroundColor: colors.wald700,
          opacity: 0.45,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: -120,
          left: -150,
          width: 320,
          height: 320,
          borderRadius: 160,
          backgroundColor: colors.apricot500,
          opacity: 0.22,
        }}
      />

      {/* Wortmarke oben */}
      <View style={{ paddingTop: 68 }}>
        <FadeUp delay={100}>
          <Text
            style={{
              fontFamily: fonts.heading700,
              fontSize: 22,
              letterSpacing: -0.44,
              color: CREAM,
            }}
          >
            Copara<Text style={{ color: APRICOT }}>.</Text>
          </Text>
        </FadeUp>
      </View>

      {/* Signatur-Animation: zwei Kreise, verbunden über das Kind (Punkt) */}
      <Pressable onPress={enter} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 210, height: 80 }}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 8,
              left: 105 - 32,
              width: 64,
              height: 64,
              borderRadius: 32,
              borderWidth: 2,
              borderColor: 'rgba(244,239,230,0.85)',
              transform: [{ translateX: leftX }],
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              top: 8,
              left: 105 - 32,
              width: 64,
              height: 64,
              borderRadius: 32,
              borderWidth: 2,
              borderColor: APRICOT,
              transform: [{ translateX: rightX }],
            }}
          />
          {/* Glow hinter dem Punkt */}
          <Animated.View
            style={{
              position: 'absolute',
              top: 33 - 11,
              left: 105 - 18,
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: APRICOT,
              opacity: Animated.multiply(glow, 0.4),
              transform: [{ scaleX: dotSx }, { scaleY: dotSy }],
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              top: 33,
              left: 105 - 7,
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: APRICOT,
              opacity: dotOpacity,
              transform: [{ scaleX: dotSx }, { scaleY: dotSy }],
            }}
          />
        </View>
      </Pressable>

      {/* Hero unten */}
      <View style={{ paddingBottom: 46 }}>
        <FadeUp delay={300}>
          <Text
            style={{
              fontFamily: fonts.body600,
              fontSize: 12,
              letterSpacing: 2.4,
              textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.55)',
            }}
          >
            Der ruhige Sorgerechts-Kalender
          </Text>
        </FadeUp>
        <FadeUp delay={420}>
          <Text
            style={{
              fontFamily: fonts.heading700,
              fontSize: 52,
              lineHeight: 52,
              letterSpacing: -1.56,
              color: CREAM,
              marginTop: 16,
            }}
          >
            Getrennt.{'\n'}Und trotzdem{'\n'}
            <Text style={{ color: APRICOT }}>zusammen.</Text>
          </Text>
        </FadeUp>
        <FadeUp delay={560}>
          <Text
            style={{
              marginTop: 22,
              fontFamily: fonts.body400,
              fontSize: 16,
              lineHeight: 24,
              color: 'rgba(244,239,230,0.7)',
              maxWidth: 320,
            }}
          >
            Der ruhige Ort für alles, was eure Kinder betrifft — statt Streit im Chat.
          </Text>
        </FadeUp>
        <FadeUp delay={680}>
          <Pressable
            onPress={enter}
            style={({ pressed }) => ({
              marginTop: 30,
              height: 56,
              borderRadius: radius.pill,
              backgroundColor: CREAM,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? motion.pressedOpacity : 1,
            })}
          >
            <Text style={{ fontFamily: fonts.body600, fontSize: 16, color: NIGHT }}>
              Los geht's
            </Text>
          </Pressable>
        </FadeUp>
        <FadeUp delay={780}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 16,
              fontFamily: fonts.body400,
              fontSize: 14,
              color: 'rgba(244,239,230,0.6)',
            }}
          >
            Schon dabei?{' '}
            <Text style={{ color: CREAM, fontFamily: fonts.body600 }}>Anmelden</Text>
          </Text>
        </FadeUp>
      </View>
    </Animated.View>
  );
}
