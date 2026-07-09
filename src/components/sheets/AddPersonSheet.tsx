/**
 * Person hinzufügen — Rolle → Kinder → Einladungs-Code.
 */
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { SectionLabel } from '@/components/SectionLabel';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Sheet } from '@/components/ui/Sheet';
import { colors, fonts, radius, spacing } from '@/theme/tokens';
import { type } from '@/theme/type';

const ROLES = [
  ['co', 'Co-Elternteil', 'gleichberechtigt für seine Kinder'],
  ['bezug', 'Bezugsperson', 'sieht nur ihren Ausschnitt'],
] as const;

export function AddPersonSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [role, setRole] = useState<string>('co');
  const [kids, setKids] = useState<Record<string, boolean>>({
    Mia: true,
    Felix: true,
    Emma: false,
  });
  return (
    <Sheet open={open} onClose={onClose} height={0.8} scrollable={false}>
      <View style={{ flex: 1, gap: 16 }}>
        <Text style={type.h2}>Person hinzufügen</Text>

        <View>
          <SectionLabel>Rolle</SectionLabel>
          <View style={{ gap: 8 }}>
            {ROLES.map(([id, label, sub]) => {
              const on = role === id;
              return (
                <Pressable
                  key={id}
                  onPress={() => setRole(id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingHorizontal: 15,
                    paddingVertical: 13,
                    borderRadius: radius.md,
                    borderWidth: on ? 2 : 1,
                    borderColor: on ? colors.wald700 : colors.sand200,
                    backgroundColor: on ? colors.wald100 : colors.sand0,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: on ? 6 : 2,
                      borderColor: on ? colors.wald700 : colors.ink400,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.ink900 }}>
                      {label}
                    </Text>
                    <Text style={type.sm}>{sub}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <SectionLabel>Für welche Kinder?</SectionLabel>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {Object.keys(kids).map((k) => {
              const on = kids[k];
              return (
                <Pressable
                  key={k}
                  onPress={() => setKids((c) => ({ ...c, [k]: !c[k] }))}
                  style={{
                    height: 40,
                    paddingHorizontal: 18,
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
                      fontSize: 14,
                      color: on ? colors.onDark : colors.ink600,
                    }}
                  >
                    {k}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.sand100,
            borderRadius: radius.md,
            padding: 16,
            alignItems: 'center',
          }}
        >
          <Text style={[type.sm, { textAlign: 'center' }]}>
            Teile diesen Code mit der Person, die du einladen möchtest:
          </Text>
          <Text
            style={{
              fontFamily: fonts.mono400,
              fontSize: 30,
              letterSpacing: 4.8,
              color: colors.wald700,
              marginVertical: 8,
            }}
          >
            T7KM2P
          </Text>
          <Pressable
            hitSlop={8}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
          >
            <Icon name="copy" size={15} color={colors.wald700} />
            <Text style={{ fontFamily: fonts.body600, fontSize: 14, color: colors.wald700 }}>
              Code kopieren
            </Text>
          </Pressable>
          <Text style={[type.caption, { marginTop: 10, textAlign: 'center' }]}>
            Beim Einrichten der App wird der Code einmal eingegeben — dann seid ihr verbunden.
          </Text>
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}
        >
          <Icon name="shield" size={13} color={colors.ink400} />
          <Text style={type.caption}>
            Nur eure Familie sieht eure Daten — niemals verkauft, niemals geteilt.
          </Text>
        </View>

        <View style={{ marginTop: 'auto', paddingBottom: spacing.s2 }}>
          <Button size="large" onPress={onClose}>
            Fertig
          </Button>
        </View>
      </View>
    </Sheet>
  );
}
