/**
 * Familie — Mitglieder & Rollen (pro Kind), Premium, „Als Oma Anna ansehen",
 * Person hinzufügen. Kinder & Erwachsene sind antippbar → bearbeiten / entfernen.
 */
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, ScrollView, View } from 'react-native';

import { SectionLabel } from '@/components/SectionLabel';
import { AddPersonSheet } from '@/components/sheets/AddPersonSheet';
import { Avatar, AvatarTone } from '@/components/ui/Avatar';
import { Chip } from '@/components/ui/Chip';
import { Icon, IconName } from '@/components/ui/Icon';
import { Sheet } from '@/components/ui/Sheet';
import { colors, fonts, gradients, radius, shadows } from '@/theme/tokens';
import { type } from '@/theme/type';

type ParentTone = 'wald' | 'apricot' | 'schiefer';

interface Kid {
  name: string;
  parents: [string, ParentTone][];
  sub: string;
}
interface Adult {
  name: string;
  tone: AvatarTone;
  role: string;
  you?: boolean;
}
type Selection = { type: 'kind'; data: Kid } | { type: 'adult'; data: Adult };

const TONE_BG: Record<ParentTone, string> = {
  wald: colors.wald100,
  apricot: colors.apricot100,
  schiefer: colors.personC100,
};
const TONE_INK: Record<ParentTone, string> = {
  wald: colors.wald700,
  apricot: colors.apricot700,
  schiefer: colors.personC700,
};

const cardStyle = {
  backgroundColor: colors.sand0,
  borderRadius: radius.lg,
  borderWidth: 1,
  borderColor: colors.sand200,
  overflow: 'hidden' as const,
};

function EditRow({ icon, label, first }: { icon: IconName; label: string; first?: boolean }) {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 4,
        paddingVertical: 14,
        borderTopWidth: first ? 0 : 1,
        borderTopColor: colors.sand200,
      }}
    >
      <Icon name={icon} size={19} color={colors.ink600} />
      <Text style={[type.body, { fontSize: 15, flex: 1 }]}>{label}</Text>
      <Icon name="chevron-right" size={17} color={colors.ink400} />
    </Pressable>
  );
}

export function FamilyScreen() {
  const router = useRouter();
  const [kids, setKids] = useState<Kid[]>([
    { name: 'Mia', parents: [['LW', 'wald'], ['MB', 'apricot']], sub: 'Lisa & Markus' },
    { name: 'Felix', parents: [['LW', 'wald'], ['MB', 'apricot']], sub: 'Lisa & Markus' },
    { name: 'Emma', parents: [['LW', 'wald'], ['TB', 'schiefer']], sub: 'Lisa & Tom' },
  ]);
  const [adults, setAdults] = useState<Adult[]>([
    { name: 'Lisa Wagner', tone: 'wald', role: 'Du · alle Kinder', you: true },
    { name: 'Markus Berg', tone: 'apricot', role: 'Co-Elternteil · Mia & Felix' },
    { name: 'Tom Baumann', tone: 'schiefer', role: 'Co-Elternteil · Emma' },
    { name: 'Oma Anna', tone: 'neutral', role: 'Bezugsperson · liest mit (Mia & Felix)' },
  ]);
  const [sel, setSel] = useState<Selection | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const close = () => {
    setSel(null);
    setConfirm(false);
  };
  const remove = () => {
    if (!sel) return;
    if (sel.type === 'kind') setKids((k) => k.filter((x) => x.name !== sel.data.name));
    else setAdults((a) => a.filter((x) => x.name !== sel.data.name));
    close();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.sand50 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 64, paddingHorizontal: 20, paddingBottom: 8 }}>
          <Text style={type.h1}>
            Eure Familie<Text style={{ color: colors.apricot500 }}>.</Text>
          </Text>
          <Text style={[type.sm, { marginTop: 4 }]}>
            Eltern gelten pro Kind — jede Person plant und sieht nur ihre Kinder.
          </Text>
        </View>

        <View style={{ paddingTop: 10, paddingHorizontal: 16, gap: 20 }}>
          {/* Kinder */}
          <View>
            <SectionLabel>Kinder</SectionLabel>
            <View style={cardStyle}>
              {kids.map((k, i) => (
                <Pressable
                  key={k.name}
                  onPress={() => setSel({ type: 'kind', data: k })}
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
                  <Avatar name={k.name} tone="neutral" size={40} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.ink900 }}>
                      {k.name}
                    </Text>
                    <Text style={type.sm}>{k.sub}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {k.parents.map(([ini, tone], j) => (
                      <View
                        key={j}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: TONE_BG[tone],
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: j ? -8 : 0,
                          borderWidth: 2,
                          borderColor: colors.sand0,
                        }}
                      >
                        <Text
                          style={{ fontFamily: fonts.body600, fontSize: 11, color: TONE_INK[tone] }}
                        >
                          {ini}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Icon
                    name="chevron-right"
                    size={17}
                    color={colors.ink400}
                    style={{ marginLeft: 4 }}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Erwachsene */}
          <View>
            <SectionLabel>Erwachsene</SectionLabel>
            <View style={cardStyle}>
              {adults.map((a, i) => (
                <Pressable
                  key={a.name}
                  onPress={() => setSel({ type: 'adult', data: a })}
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
                  <Avatar name={a.name} tone={a.tone} size={40} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.ink900 }}>
                      {a.name}
                    </Text>
                    <Text style={type.sm}>{a.role}</Text>
                  </View>
                  <Icon name="chevron-right" size={17} color={colors.ink400} />
                </Pressable>
              ))}
              <Pressable
                onPress={() => setAddOpen(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderTopWidth: 1,
                  borderTopColor: colors.sand200,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: colors.wald100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="user-plus" size={19} color={colors.wald700} />
                </View>
                <Text
                  style={{
                    fontFamily: fonts.body600,
                    fontSize: 15,
                    color: colors.wald700,
                    flex: 1,
                  }}
                >
                  Person hinzufügen
                </Text>
                <Chip tone="premium">Premium</Chip>
              </Pressable>
            </View>
          </View>

          {/* Premium */}
          <View
            style={[
              {
                backgroundColor: colors.sand0,
                borderRadius: radius.lg,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              },
              shadows.card,
            ]}
          >
            <LinearGradient
              colors={gradients.premium}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.4 }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="crown" size={20} color={colors.gold900} />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.ink900 }}>
                Premium ist aktiv
              </Text>
              <Text style={type.sm}>Trägt das Netz um eure Kinder · 4,99 €/Monat</Text>
            </View>
            <Chip tone="premium">aktiv</Chip>
          </View>

          {/* Als Oma Anna ansehen */}
          <Pressable
            onPress={() => router.push('/oma')}
            style={[
              cardStyle,
              {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
              },
            ]}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.sand100,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="eye" size={19} color={colors.ink600} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.ink900 }}>
                Als Oma Anna ansehen
              </Text>
              <Text style={type.sm}>So sieht die Bezugsperson eure Familie.</Text>
            </View>
            <Icon name="chevron-right" size={17} color={colors.ink400} />
          </Pressable>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              paddingHorizontal: 20,
            }}
          >
            <Icon name="shield" size={13} color={colors.ink400} />
            <Text style={[type.caption, { textAlign: 'center', flexShrink: 1 }]}>
              Nur eure Familie sieht eure Daten — niemals verkauft, niemals geteilt.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Person bearbeiten / entfernen */}
      <Sheet open={sel !== null} onClose={close} height={0.62} scrollable={false}>
        {sel ? (
          <View style={{ flex: 1, gap: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar
                name={sel.data.name}
                tone={sel.type === 'kind' ? 'neutral' : sel.data.tone}
                size={48}
              />
              <View>
                <Text style={[type.h2, { fontSize: 21, lineHeight: 27 }]}>{sel.data.name}</Text>
                <Text style={type.sm}>{sel.type === 'kind' ? sel.data.sub : sel.data.role}</Text>
              </View>
            </View>

            {sel.type === 'kind' ? (
              <View>
                <EditRow icon="pencil" label="Name & Geburtstag" first />
                <EditRow icon="file-text" label="Info-Seite — Gesundheit, Schule, Größen" />
                <EditRow icon="users" label="Eltern & Zuständigkeit" />
              </View>
            ) : (
              <View>
                <EditRow icon="pencil" label="Name bearbeiten" first />
                <EditRow icon="users" label={sel.data.you ? 'Deine Zuständigkeit' : 'Rolle & Kinder'} />
                <EditRow icon="bell" label="Benachrichtigungen" />
              </View>
            )}

            {/* Entfernen */}
            <View style={{ marginTop: 'auto', paddingBottom: 6 }}>
              {sel.type === 'adult' && sel.data.you ? (
                <Text style={[type.caption, { textAlign: 'center' }]}>
                  Das bist du — dein Zugang bleibt bestehen.
                </Text>
              ) : confirm ? (
                <View style={{ backgroundColor: colors.sand100, borderRadius: radius.md, padding: 16 }}>
                  <Text style={[type.sm, { color: colors.ink900, textAlign: 'center', marginBottom: 12 }]}>
                    {sel.type === 'kind'
                      ? `${sel.data.name} aus eurer Familie entfernen? Kalender und Infos werden gelöst.`
                      : `${sel.data.name.split(' ')[0]} den Zugang entziehen? Die Person sieht eure Familie dann nicht mehr.`}
                  </Text>
                  <Pressable
                    onPress={remove}
                    style={({ pressed }) => ({
                      height: 52,
                      borderRadius: radius.pill,
                      backgroundColor: colors.clay500,
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <Text style={{ fontFamily: fonts.body600, fontSize: 16, color: colors.onDark }}>
                      {sel.type === 'kind' ? 'Endgültig entfernen' : 'Zugang entziehen'}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setConfirm(false)}
                    style={{ height: 44, marginTop: 8, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ fontFamily: fonts.body500, fontSize: 14, color: colors.ink600 }}>
                      Abbrechen
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => setConfirm(true)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    height: 48,
                  }}
                >
                  <Icon name="x" size={17} color={colors.clay500} />
                  <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.clay500 }}>
                    {sel.type === 'kind' ? 'Kind entfernen' : 'Aus Familie entfernen'}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        ) : null}
      </Sheet>

      <AddPersonSheet open={addOpen} onClose={() => setAddOpen(false)} />
    </View>
  );
}
