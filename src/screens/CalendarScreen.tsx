/**
 * Kalender — das Beschlossene. Pro-Kind-Umschalter (Alle · Mia · Felix · Emma),
 * Drei-Farben-Custody (Wald = bei dir · Aprikose = Markus · Schiefer = Tom),
 * „Als Nächstes". Ändern per Tipp öffnet das Tages-Sheet.
 */
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { SectionLabel } from '@/components/SectionLabel';
import { DaySheet } from '@/components/sheets/DaySheet';
import { Chip } from '@/components/ui/Chip';
import { Icon, IconName } from '@/components/ui/Icon';
import { useAppState } from '@/state/app-state';
import { colors, fonts, radius } from '@/theme/tokens';
import { type } from '@/theme/type';

type Person = 'lisa' | 'markus' | 'tom';
type Child = 'alle' | 'mia' | 'felix' | 'emma';

// Februar 2026 — 1. Feb ist Sonntag. Mo-erste Woche.
const LEAD_BLANKS = 6;
const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);
const TODAY = 10;

// Custody pro Kind (Kanon): Mia & Felix bei Markus 9.–15., sonst bei Lisa.
// Emma bei Tom bis 17., kommt am 18. zu Lisa.
const locMF = (d: number): Person => (d >= 9 && d <= 15 ? 'markus' : 'lisa');
const locE = (d: number): Person => (d < 18 ? 'tom' : 'lisa');

const P: Record<Person, { bg: string; ink: string; dot: string }> = {
  lisa: { bg: colors.wald100, ink: colors.wald700, dot: colors.wald500 },
  markus: { bg: colors.apricot100, ink: colors.apricot700, dot: colors.apricot500 },
  tom: { bg: colors.personC100, ink: colors.personC700, dot: colors.personC500 },
};

const TERMINE: Record<number, string> = {
  11: colors.apricot500,
  16: colors.wald500,
  18: colors.personC500,
  19: colors.wald500,
};
const OFFEN: Record<number, boolean> = { 28: true };

const KIDS: [Child, string][] = [
  ['alle', 'Alle'],
  ['mia', 'Mia'],
  ['felix', 'Felix'],
  ['emma', 'Emma'],
];

const NEXT: { icon: IconName; when: string; what: string; tone: string }[] = [
  { icon: 'clock', when: 'Morgen', what: 'Fußball Felix · Markus fährt', tone: colors.apricot500 },
  {
    icon: 'arrow-left-right',
    when: 'In 6 Tagen',
    what: 'Übergabe an dich · Schule',
    tone: colors.wald500,
  },
  {
    icon: 'map-pin',
    when: 'In 8 Tagen',
    what: 'Emma kommt zu dir · von Tom',
    tone: colors.personC500,
  },
  { icon: 'users', when: 'In 9 Tagen', what: 'Abholung durch Oma Anna', tone: colors.ink400 },
];

export function CalendarScreen() {
  const { focus, flash } = useAppState();
  const [child, setChild] = useState<Child>('alle');
  const [showMonth, setShowMonth] = useState(!focus);
  const [dayOpen, setDayOpen] = useState(false);

  useEffect(() => setShowMonth(!focus), [focus]);

  const cell = (d: number) => {
    const isToday = d === TODAY;
    let bg: string = colors.sand0;
    let ink: string = colors.ink600;
    let borderWidth = 1;
    let dots: string[] | null = null;
    if (child === 'mia' || child === 'felix') {
      const c = P[locMF(d)];
      bg = c.bg;
      ink = c.ink;
      borderWidth = 0;
    } else if (child === 'emma') {
      const c = P[locE(d)];
      bg = c.bg;
      ink = c.ink;
      borderWidth = 0;
    } else {
      const allHome = locMF(d) === 'lisa' && locE(d) === 'lisa';
      bg = allHome ? colors.wald100 : colors.sand0;
      borderWidth = allHome ? 0 : 1;
      ink = colors.ink900;
      if (!allHome) dots = [P[locMF(d)].dot, P[locE(d)].dot];
    }
    return (
      <Pressable
        key={d}
        onPress={() => setDayOpen(true)}
        style={{
          width: `${100 / 7}%`,
          padding: 3,
        }}
      >
        <View
          style={{
            height: 44,
            borderRadius: radius.md,
            borderWidth: isToday ? 2 : borderWidth,
            borderColor: isToday ? colors.wald700 : colors.sand200,
            backgroundColor: bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: isToday ? fonts.body600 : fonts.body500,
              fontSize: 13,
              color: ink,
            }}
          >
            {d}
          </Text>
          {dots ? (
            <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row', gap: 3 }}>
              {dots.map((c, i) => (
                <View key={i} style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: c }} />
              ))}
            </View>
          ) : TERMINE[d] ? (
            <View
              style={{
                position: 'absolute',
                bottom: 4,
                width: 16,
                height: 3,
                borderRadius: 2,
                backgroundColor: TERMINE[d],
              }}
            />
          ) : null}
          {OFFEN[d] ? (
            <View
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.apricot500,
              }}
            />
          ) : null}
        </View>
      </Pressable>
    );
  };

  // Dynamische Legende je nach Kind
  const legend: [Person, string][] =
    child === 'emma'
      ? [
          ['lisa', 'bei dir'],
          ['tom', 'bei Tom'],
        ]
      : child === 'alle'
      ? [
          ['lisa', 'bei dir'],
          ['markus', 'bei Markus'],
          ['tom', 'bei Tom'],
        ]
      : [
          ['lisa', 'bei dir'],
          ['markus', 'bei Markus'],
        ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.sand50 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        {/* Kopf */}
        <View
          style={{
            paddingTop: 64,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text style={[type.h1, { flex: 1 }]}>
            Kalender<Text style={{ color: colors.apricot500 }}>.</Text>
          </Text>
          <Pressable hitSlop={8}>
            <Icon name="chevron-left" size={22} color={colors.ink400} />
          </Pressable>
          <Text style={type.h3}>Februar</Text>
          <Pressable hitSlop={8}>
            <Icon name="chevron-right" size={22} color={colors.ink600} />
          </Pressable>
        </View>

        {/* Pro-Kind-Umschalter (Premium) */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingTop: 14,
            paddingHorizontal: 20,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ gap: 6 }}
          >
            {KIDS.map(([id, label]) => {
              const on = child === id;
              return (
                <Pressable
                  key={id}
                  onPress={() => setChild(id)}
                  style={{
                    height: 34,
                    paddingHorizontal: 15,
                    borderRadius: radius.pill,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: on ? 0 : 1,
                    borderColor: colors.sand200,
                    backgroundColor: on ? colors.wald700 : colors.sand0,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.body600,
                      fontSize: 13,
                      color: on ? colors.onDark : colors.ink600,
                    }}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <Chip tone="premium">Pro Kind</Chip>
        </View>

        {/* Legende */}
        {showMonth ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 16,
              paddingTop: 14,
              paddingHorizontal: 20,
            }}
          >
            {legend.map(([p, label]) => (
              <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 4,
                    backgroundColor: P[p].bg,
                    borderWidth: 1,
                    borderColor: P[p].dot,
                  }}
                />
                <Text style={type.caption}>{label}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: colors.apricot500,
                }}
              />
              <Text style={type.caption}>offen</Text>
            </View>
          </View>
        ) : null}

        {/* Raster oder Klartext (Fokus) */}
        {showMonth ? (
          <View style={{ paddingTop: 16, paddingHorizontal: 17 }}>
            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d) => (
                <Text
                  key={d}
                  style={[
                    type.caption,
                    { width: `${100 / 7}%`, textAlign: 'center', fontFamily: fonts.body600 },
                  ]}
                >
                  {d}
                </Text>
              ))}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {Array.from({ length: LEAD_BLANKS }).map((_, i) => (
                <View key={`b${i}`} style={{ width: `${100 / 7}%` }} />
              ))}
              {DAYS.map(cell)}
            </View>
          </View>
        ) : (
          <View style={{ paddingTop: 18, paddingHorizontal: 20 }}>
            <View style={{ backgroundColor: colors.wald100, borderRadius: radius.lg, padding: 18 }}>
              <Text
                style={[
                  type.overline,
                  { letterSpacing: 0.66, color: colors.wald500, marginBottom: 8 },
                ]}
              >
                Diese Woche
              </Text>
              <Text
                style={{
                  fontFamily: fonts.heading700,
                  fontSize: 20,
                  lineHeight: 26,
                  color: colors.wald700,
                }}
              >
                Mia & Felix bei Markus, Emma bei Tom.
              </Text>
              <Text style={[type.sm, { color: colors.wald700, marginTop: 6 }]}>
                Zurück zu dir am Mo, 16. Feb, 8:00.
              </Text>
            </View>
            <Pressable
              onPress={() => setShowMonth(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                paddingTop: 14,
                paddingHorizontal: 2,
              }}
            >
              <Icon name="calendar" size={16} color={colors.ink600} />
              <Text style={{ fontFamily: fonts.body600, fontSize: 14, color: colors.ink600 }}>
                Monat anzeigen
              </Text>
            </Pressable>
          </View>
        )}

        {/* Als Nächstes */}
        <View style={{ paddingTop: 22, paddingHorizontal: 16 }}>
          <SectionLabel>Als Nächstes — vereinbart</SectionLabel>
          <View
            style={{
              backgroundColor: colors.sand0,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: colors.sand200,
              overflow: 'hidden',
            }}
          >
            {NEXT.map((n, i) => (
              <Pressable
                key={n.when}
                onPress={() => setDayOpen(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderTopWidth: i ? 1 : 0,
                  borderTopColor: colors.sand200,
                }}
              >
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: colors.sand100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name={n.icon} size={17} color={n.tone} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.body600, fontSize: 14.5, color: colors.ink900 }}>
                    {n.when}
                  </Text>
                  <Text style={[type.sm, { marginTop: 1 }]}>{n.what}</Text>
                </View>
                <Icon name="chevron-right" size={17} color={colors.ink400} />
              </Pressable>
            ))}
          </View>
          <Text style={[type.caption, { textAlign: 'center', marginTop: 12 }]}>
            Ändern per Tipp — alles Offene wartet im To-Do.
          </Text>
        </View>
      </ScrollView>

      <DaySheet
        open={dayOpen}
        onClose={() => setDayOpen(false)}
        onRequest={() => {
          setDayOpen(false);
          flash('Anfrage gesendet');
        }}
      />
    </View>
  );
}
