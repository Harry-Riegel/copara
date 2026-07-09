/**
 * Anfrage stellen (Plus) — Ein Tag / Zeitraum / Serie + Empfänger-Wahl.
 * Premium-Empfänger tragen den Gold-Chip; nie tot ausgegraut.
 */
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { SectionLabel } from '@/components/SectionLabel';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { Sheet } from '@/components/ui/Sheet';
import { colors, fonts, radius, shadows, spacing } from '@/theme/tokens';
import { type } from '@/theme/type';

const SEGMENTS = [
  ['tag', 'Ein Tag'],
  ['zeitraum', 'Zeitraum'],
  ['serie', 'Serie'],
] as const;

const RECIPIENTS = [
  { id: 'markus', label: 'An Markus', sub: 'direkt an den anderen Elternteil', premium: false },
  { id: 'alle', label: 'An alle', sub: 'erste Zusage gewinnt', premium: true },
  { id: 'oma', label: 'Nur an Oma & Opa', sub: 'Bezugspersonen', premium: true },
] as const;

function RadioDot({ on }: { on: boolean }) {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: on ? 6 : 2,
        borderColor: on ? colors.wald700 : colors.ink400,
      }}
    />
  );
}

export function RequestSheet({
  open,
  onClose,
  onSent,
}: {
  open: boolean;
  onClose: () => void;
  onSent: () => void;
}) {
  const [span, setSpan] = useState<string>('zeitraum');
  const [rcpt, setRcpt] = useState<string>('markus');
  return (
    <Sheet open={open} onClose={onClose} height={0.82} scrollable={false}>
      <View style={{ flex: 1, gap: 16 }}>
        <Text style={type.h2}>Anfrage stellen</Text>

        {/* Segment */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.sand100,
            borderRadius: radius.pill,
            padding: 4,
          }}
        >
          {SEGMENTS.map(([id, label]) => {
            const on = span === id;
            return (
              <Pressable
                key={id}
                onPress={() => setSpan(id)}
                style={[
                  {
                    flex: 1,
                    height: 38,
                    borderRadius: radius.pill,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: on ? colors.sand0 : 'transparent',
                  },
                  on ? shadows.card : null,
                ]}
              >
                <Text
                  style={{
                    fontFamily: fonts.body600,
                    fontSize: 14,
                    color: on ? colors.ink900 : colors.ink600,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Datum */}
        <View
          style={{
            backgroundColor: colors.sand0,
            borderWidth: 1,
            borderColor: colors.sand200,
            borderRadius: radius.md,
            paddingHorizontal: 16,
            paddingVertical: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Icon name="calendar" size={20} color={colors.wald700} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.ink900 }}>
              30. März – 3. April
            </Text>
            <Text style={type.sm}>5 Tage · Osterferien · Mia & Felix</Text>
          </View>
          <Pressable hitSlop={8}>
            <Text style={{ fontFamily: fonts.body600, fontSize: 14, color: colors.wald700 }}>
              Ändern
            </Text>
          </Pressable>
        </View>

        {/* Empfänger */}
        <View>
          <SectionLabel>Empfänger</SectionLabel>
          <View style={{ gap: 8 }}>
            {RECIPIENTS.map((r) => {
              const on = rcpt === r.id;
              return (
                <Pressable
                  key={r.id}
                  onPress={() => setRcpt(r.id)}
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
                  <RadioDot on={on} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.ink900 }}>
                      {r.label}
                    </Text>
                    <Text style={type.sm}>{r.sub}</Text>
                  </View>
                  {r.premium ? <Chip tone="premium">Premium</Chip> : null}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.sand100,
            borderRadius: radius.sm,
            paddingHorizontal: 14,
            paddingVertical: 12,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <Icon name="info" size={17} color={colors.amber500} style={{ marginTop: 1 }} />
          <Text style={[type.sm, { flex: 1 }]}>
            Auslandsferien? Copara erinnert an die Reise-Erlaubnis. Gegentag ist optional.
          </Text>
        </View>

        <View style={{ marginTop: 'auto', paddingBottom: spacing.s2 }}>
          <Button size="large" onPress={onSent}>
            Weiter
          </Button>
        </View>
      </View>
    </Sheet>
  );
}
