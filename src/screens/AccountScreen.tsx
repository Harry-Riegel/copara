/**
 * Konto (über den Avatar) — Profil, Anzeige (Fokus-Modus), Konto-Sektionen.
 * Alle Zeilen öffnen ein echtes Sheet.
 */
import { useRouter } from 'expo-router';
import { ReactNode, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { SectionLabel } from '@/components/SectionLabel';
import { Toggle } from '@/components/Toggle';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Icon, IconName } from '@/components/ui/Icon';
import { Sheet } from '@/components/ui/Sheet';
import { useAppState } from '@/state/app-state';
import { colors, fonts, radius, shadows } from '@/theme/tokens';
import { type } from '@/theme/type';

const flatCard = {
  backgroundColor: colors.sand0,
  borderRadius: radius.lg,
  borderWidth: 1,
  borderColor: colors.sand200,
  overflow: 'hidden' as const,
};

function SettingToggle({ label, def, sub }: { label: string; def: boolean; sub?: string }) {
  const [on, setOn] = useState(def);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={[type.body, { fontSize: 15 }]}>{label}</Text>
        {sub ? <Text style={[type.caption, { marginTop: 2 }]}>{sub}</Text> : null}
      </View>
      <Toggle value={on} onChange={setOn} label={label} />
    </View>
  );
}

function InfoPill({ icon, text, tone }: { icon: IconName; text: string; tone: 'sand' | 'wald' }) {
  const bg = tone === 'wald' ? colors.wald100 : colors.sand100;
  const fg = tone === 'wald' ? colors.wald700 : colors.ink900;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: bg,
        borderRadius: radius.sm,
        paddingHorizontal: 14,
        paddingVertical: 12,
      }}
    >
      <Icon name={icon} size={17} color={tone === 'wald' ? colors.wald700 : colors.gold500} />
      <Text style={[type.sm, { color: fg, fontFamily: fonts.body600, flex: 1 }]}>{text}</Text>
    </View>
  );
}

type SheetKey = 'premium' | 'focus' | 'bell' | 'sync' | 'stats' | 'verlauf' | 'privacy';

export default function AccountScreen() {
  const router = useRouter();
  const { focus, setFocus } = useAppState();
  const [sheet, setSheet] = useState<SheetKey | null>(null);

  const row = (
    icon: IconName,
    label: string,
    value: string | null,
    valueColor: string | null,
    key: SheetKey,
    first?: boolean
  ) => (
    <Pressable
      onPress={() => setSheet(key)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopWidth: first ? 0 : 1,
        borderTopColor: colors.sand200,
      }}
    >
      <Icon name={icon} size={19} color={colors.ink600} />
      <Text style={[type.body, { fontSize: 15, flex: 1 }]}>{label}</Text>
      {value ? <Text style={[type.sm, { color: valueColor ?? colors.ink600 }]}>{value}</Text> : null}
      <Icon name="chevron-right" size={17} color={colors.ink400} />
    </Pressable>
  );

  const sheetContent: Record<SheetKey, { title: string; premium?: boolean; body: ReactNode }> = {
    premium: {
      title: 'Copara Premium',
      body: (
        <>
          <InfoPill icon="crown" text="Aktiv · eine Familie, ein Abo · 4,99 €/Monat" tone="sand" />
          <Text style={type.sm}>
            Großeltern, die abholen. Ein Au-pair, das Bescheid wissen muss. Ein zweiter Ex-Partner
            mit eigenen Tagen. Premium bindet alle ein, die bei euren Kindern helfen — jede Person
            sieht genau das, was sie braucht, und kein bisschen mehr.
          </Text>
          {(
            [
              ['Oma, Opa & Au-pair einladen', 'Sie sehen nur die Tage und Termine ihres Kindes — ohne in euren Nachrichten mitzulesen.'],
              ['Notfall-Helfer, wenn keiner kann', 'Antwortet der andere Elternteil nicht, fragt Copara automatisch Oma & Opa. Kein Kind bleibt ohne Abholung.'],
              ['Eine Frage an alle gleichzeitig', '„Wer holt Mia am Freitag?" — die Erste, die zusagt, übernimmt. Kein Herumtelefonieren.'],
              ['Mehrere Kinder getrennt planen', 'Jedes Kind mit eigenem Kalender und eigenen Übergaben — auch bei verschiedenen Vätern.'],
              ['Erinnerungen, die mitdenken', 'Vor dem Arzttermin die Gesundheitskarte, vor der Auslandsreise die Reise-Erlaubnis — automatisch.'],
              ['Monatsübersicht als PDF', 'Wer hatte die Kinder wann — sauber dokumentiert für Anwältin, Jugendamt oder Mediation.'],
            ] as [string, string][]
          ).map(([title, sub]) => (
            <View key={title} style={{ flexDirection: 'row', gap: 11, alignItems: 'flex-start' }}>
              <Icon name="check" size={16} color={colors.wald500} style={{ marginTop: 3 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.body600, fontSize: 14.5, color: colors.ink900 }}>
                  {title}
                </Text>
                <Text style={[type.caption, { marginTop: 1 }]}>{sub}</Text>
              </View>
            </View>
          ))}
        </>
      ),
    },
    focus: {
      title: 'Fokus-Modus',
      body: (
        <>
          <Text style={type.sm}>
            Eine Sache nach der anderen, ganz in Ruhe. Du siehst immer nur den nächsten Schritt —
            „Später" schiebt etwas nach hinten, und am Schluss steht die Gewissheit: „Das war
            alles."
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={[type.body, { fontSize: 15 }]}>Fokus-Modus</Text>
              <Text style={[type.caption, { marginTop: 2 }]}>Immer nur eine Sache anzeigen</Text>
            </View>
            <Toggle value={focus} onChange={setFocus} label="Fokus-Modus" />
          </View>
        </>
      ),
    },
    bell: {
      title: 'Benachrichtigungen',
      body: (
        <>
          <Text style={[type.sm, { marginBottom: 6 }]}>Nur was wichtig ist, nie Marketing.</Text>
          {(
            [
              ['Neue Anfragen', true],
              ['Antworten & Bestätigungen', true],
              ['Erinnerung vor Übergaben', true],
              ['Notfall-Eskalationen', true],
              ['Produkt-Neuigkeiten', false],
            ] as [string, boolean][]
          ).map(([label, def]) => (
            <SettingToggle key={label} label={label} def={def} />
          ))}
        </>
      ),
    },
    sync: {
      title: 'Kalender-Sync',
      body: (
        <>
          <InfoPill icon="check" text="Aktiv — zuletzt synchronisiert vor 2 Minuten" tone="wald" />
          <Text style={type.sm}>
            Bestätigte Wechsel und Termine landen automatisch in deinem iOS-Kalender — Änderungen
            werden mitgeführt.
          </Text>
          <SettingToggle label="Mit iOS-Kalender synchronisieren" def />
          <SettingToggle label="Erinnerung 1 Tag vor Übergabe" def />
        </>
      ),
    },
    stats: {
      title: 'Februar in Zahlen',
      premium: true,
      body: (
        <>
          {(
            [
              ['Lisa', '14 Tage', colors.wald500],
              ['Markus', '14 Tage', colors.apricot500],
            ] as [string, string, string][]
          ).map(([name, val, color]) => (
            <View key={name}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}
              >
                <Text style={[type.sm, { fontFamily: fonts.body600, color: colors.ink900 }]}>
                  {name}
                </Text>
                <Text style={type.sm}>{val}</Text>
              </View>
              <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.sand100 }}>
                <View
                  style={{ width: '50%', height: '100%', borderRadius: 4, backgroundColor: color }}
                />
              </View>
            </View>
          ))}
          <View style={{ borderTopWidth: 1, borderTopColor: colors.sand200, paddingTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[type.sm, { fontFamily: fonts.body600, color: colors.ink900 }]}>
                Tausch-Bilanz
              </Text>
              <Text style={[type.sm, { fontFamily: fonts.body600, color: colors.wald700 }]}>
                +1 Tag für dich
              </Text>
            </View>
            <Text style={[type.caption, { marginTop: 4 }]}>
              Neutral & still protokolliert — die Zahlen sprechen, nicht die App.
            </Text>
          </View>
          <Button variant="secondary" size="large">
            Als PDF exportieren
          </Button>
        </>
      ),
    },
    verlauf: {
      title: 'Verlauf & Entschieden',
      body: (
        <>
          <Text style={[type.sm, { marginBottom: 4 }]}>
            Still protokolliert — fair für beide Seiten.
          </Text>
          {(
            [
              ['10.02. · 14:07', 'Oma Anna hat den 28. Februar übernommen.'],
              ['09.02. · 19:20', 'Tausch bestätigt: Emma kommt Mi, 18. Feb.'],
              ['06.02. · 08:15', 'Ferien-Anfrage an Markus gesendet.'],
              ['03.02. · 16:40', 'Fußball Felix in den Kalender übernommen.'],
            ] as [string, string][]
          ).map(([ts, txt]) => (
            <View
              key={ts}
              style={{
                flexDirection: 'row',
                gap: 12,
                paddingVertical: 10,
                borderTopWidth: 1,
                borderTopColor: colors.sand200,
              }}
            >
              <Text
                style={{ fontFamily: fonts.mono400, fontSize: 12, color: colors.ink400, width: 92 }}
              >
                {ts}
              </Text>
              <Text style={[type.sm, { flex: 1 }]}>{txt}</Text>
            </View>
          ))}
        </>
      ),
    },
    privacy: {
      title: 'Datenschutz',
      body: (
        <>
          <InfoPill icon="shield" text="Streng geschützt" tone="wald" />
          <Text style={type.sm}>
            Nur eure Familie sieht eure Daten — niemals verkauft, niemals geteilt. (DSGVO)
          </Text>
          <SettingToggle
            label="Aktivität still protokollieren"
            sub="Für faire Nachweise — nur für euch sichtbar"
            def
          />
        </>
      ),
    },
  };
  const sc = sheet ? sheetContent[sheet] : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.sand50 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 56, paddingHorizontal: 20 }}>
          <Pressable
            onPress={() => router.back()}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            hitSlop={8}
          >
            <Icon name="chevron-left" size={18} color={colors.ink600} />
            <Text style={{ fontFamily: fonts.body400, fontSize: 14, color: colors.ink600 }}>
              Zurück
            </Text>
          </Pressable>
        </View>
        <View style={{ paddingTop: 16, paddingHorizontal: 20, paddingBottom: 12 }}>
          <Text style={type.h1}>
            Konto<Text style={{ color: colors.apricot500 }}>.</Text>
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, gap: 18 }}>
          {/* Profil */}
          <View
            style={[
              {
                backgroundColor: colors.sand0,
                borderRadius: radius.lg,
                padding: 18,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
              },
              shadows.card,
            ]}
          >
            <Avatar name="Lisa Wagner" tone="wald" size={48} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.body600, fontSize: 16, color: colors.ink900 }}>
                Lisa Wagner
              </Text>
              <Text style={[type.caption, { marginTop: 2 }]}>lisa@example.de · Familie Wagner</Text>
            </View>
            <Icon name="pencil" size={16} color={colors.ink400} />
          </View>

          {/* Premium */}
          <Pressable
            onPress={() => setSheet('premium')}
            style={[
              flatCard,
              {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
              },
            ]}
          >
            <Icon name="crown" size={19} color={colors.gold500} />
            <Text
              style={[type.body, { fontSize: 15, flex: 1, fontFamily: fonts.body600 }]}
            >
              Copara Premium
            </Text>
            <Chip tone="premium">Aktiv · Familie</Chip>
          </Pressable>

          {/* Anzeige — Fokus-Modus */}
          <View>
            <SectionLabel>Anzeige</SectionLabel>
            <View style={[flatCard, { padding: 16 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Icon name="sun" size={19} color={colors.wald700} />
                <Text style={[type.body, { fontSize: 15, flex: 1, fontFamily: fonts.body600 }]}>
                  Fokus-Modus
                </Text>
                <Toggle value={focus} onChange={setFocus} size={30} label="Fokus-Modus" />
              </View>
              <Text style={[type.sm, { marginTop: 10 }]}>
                Eine Sache nach der anderen — ganz in Ruhe. Du siehst immer nur den nächsten
                Schritt, alles andere bleibt griffbereit.
              </Text>
            </View>
          </View>

          {/* Konto */}
          <View>
            <SectionLabel>Konto</SectionLabel>
            <View style={flatCard}>
              {row('rotate-ccw', 'Verlauf & Entschieden', null, null, 'verlauf', true)}
              {row('bell', 'Benachrichtigungen', 'An', null, 'bell')}
              {row('calendar', 'Kalender-Sync', 'Aktiv', colors.wald500, 'sync')}
              {row('chart-column', 'Statistik & Export', null, null, 'stats')}
              {row('shield', 'Datenschutz', 'Streng geschützt', null, 'privacy')}
            </View>
          </View>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}
          >
            <Icon name="log-out" size={19} color={colors.ink600} />
            <Text style={type.muted}>Abmelden</Text>
          </Pressable>

          <Text style={[type.caption, { textAlign: 'center' }]}>
            Copara 1.0 · Getrennt und trotzdem zusammen!{'\n'}
            Deine Daten gehören deiner Familie — niemals verkauft, niemals geteilt. (DSGVO)
          </Text>
        </View>
      </ScrollView>

      <Sheet open={!!sheet} onClose={() => setSheet(null)} height={0.72} scrollable={false}>
        {sc ? (
          <View style={{ flex: 1, gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={[type.h2, { flex: 1 }]}>{sc.title}</Text>
              {sc.premium ? <Chip tone="premium">Premium</Chip> : null}
            </View>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ gap: 12 }}
              showsVerticalScrollIndicator={false}
            >
              {sc.body}
            </ScrollView>
            <View style={{ paddingBottom: 6 }}>
              <Button variant="tertiary" size="large" onPress={() => setSheet(null)}>
                Fertig
              </Button>
            </View>
          </View>
        ) : null}
      </Sheet>
    </View>
  );
}
