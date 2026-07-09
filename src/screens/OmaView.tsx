/**
 * „Als Oma Anna ansehen" — Klartext-Dritt-Ansicht. Bezugspersonen sehen ganze
 * Sätze statt Raster, nur ihren Ausschnitt (Mia & Felix).
 */
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { colors, fonts, radius } from '@/theme/tokens';
import { type } from '@/theme/type';

export default function OmaView() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: colors.sand50 }}>
      {/* Vorschau-Leiste */}
      <View
        style={{
          backgroundColor: colors.apricot100,
          paddingTop: 54,
          paddingBottom: 12,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          zIndex: 10,
        }}
      >
        <Icon name="eye" size={17} color={colors.apricot700} />
        <Text
          style={[type.sm, { color: colors.apricot700, fontFamily: fonts.body600, flex: 1 }]}
        >
          Vorschau: So sieht Oma Anna eure Familie
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: colors.sand0,
            borderRadius: radius.pill,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text style={{ fontFamily: fonts.body600, fontSize: 13, color: colors.apricot700 }}>
            Schließen
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 18, paddingHorizontal: 20, paddingBottom: 40, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Avatar name="Oma Anna" tone="neutral" size={44} />
          <View>
            <Text style={[type.h1, { fontSize: 24, lineHeight: 29 }]}>Hallo Anna</Text>
            <Text style={type.sm}>Du siehst mit: Mia & Felix</Text>
          </View>
        </View>

        {/* Bitte um Hilfe — Aprikose (wie offene Anfragen bei den Eltern) */}
        <View style={{ backgroundColor: colors.apricot100, borderRadius: radius.lg, padding: 18 }}>
          <Text
            style={[
              type.overline,
              { letterSpacing: 0.66, color: colors.apricot700, marginBottom: 8 },
            ]}
          >
            Kannst du helfen?
          </Text>
          <Text
            style={{
              fontFamily: fonts.body600,
              fontSize: 16,
              lineHeight: 22,
              color: colors.apricot700,
            }}
          >
            Am 28. Februar wird jemand für Mias Arzttermin gebraucht.
          </Text>
          <Text style={[type.sm, { color: colors.apricot700, marginTop: 6 }]}>
            Kinderarzt, 14:00. Du hast schon zugesagt — danke.
          </Text>
        </View>

        {/* Reine Info — neutral */}
        <View
          style={{
            backgroundColor: colors.sand0,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.sand200,
            padding: 18,
          }}
        >
          <Text
            style={[type.overline, { letterSpacing: 0.66, color: colors.ink400, marginBottom: 8 }]}
          >
            Als Nächstes
          </Text>
          <View style={{ gap: 10 }}>
            <Text style={type.body}>Do, 19. Februar, 15:30 — du holst Felix von der Schule.</Text>
            <Text style={[type.muted, { fontSize: 15 }]}>
              Mo, 16. Februar — die Kinder sind wieder bei Lisa.
            </Text>
          </View>
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <Icon name="shield" size={13} color={colors.ink400} />
          <Text style={[type.caption, { textAlign: 'center', flexShrink: 1 }]}>
            Du siehst nur, was für Mia & Felix wichtig ist — sonst nichts.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
