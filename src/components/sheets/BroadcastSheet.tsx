/**
 * Broadcast — „An alle": erste Zusage gewinnt. Personenliste mit Status.
 */
import { Text, View } from 'react-native';

import { Avatar, AvatarTone } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Chip, ChipTone } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { Sheet } from '@/components/ui/Sheet';
import { colors, fonts, radius, spacing } from '@/theme/tokens';
import { type } from '@/theme/type';

const PEOPLE: { name: string; tone: AvatarTone; status: string; chip: ChipTone; dim?: boolean }[] = [
  { name: 'Oma Anna', tone: 'neutral', status: 'übernimmt', chip: 'wald' },
  { name: 'Markus Berg', tone: 'apricot', status: 'nicht nötig', chip: 'neutral', dim: true },
  { name: 'Opa Heinz', tone: 'neutral', status: 'nicht nötig', chip: 'neutral', dim: true },
  { name: 'Au-pair Sofia', tone: 'neutral', status: 'nicht nötig', chip: 'neutral', dim: true },
];

export function BroadcastSheet({
  open,
  onClose,
  onResult,
}: {
  open: boolean;
  onClose: () => void;
  onResult: (kind: 'bestätigt' | 'übernommen') => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} height={0.78} scrollable={false}>
      <View style={{ flex: 1, gap: 14 }}>
        <View>
          <Text style={type.caption}>Frage an alle</Text>
          <Text style={[type.h2, { fontSize: 21, lineHeight: 27, marginTop: 2 }]}>
            Wer übernimmt den 28. Februar?
          </Text>
          <Text style={[type.sm, { marginTop: 6 }]}>
            Kinderarzt Mia, 14:00 · erste Zusage gewinnt.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.sand0,
            borderWidth: 1,
            borderColor: colors.sand200,
            borderRadius: radius.lg,
            overflow: 'hidden',
          }}
        >
          {PEOPLE.map((p, i) => (
            <View
              key={p.name}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: 15,
                paddingVertical: 13,
                borderTopWidth: i ? 1 : 0,
                borderTopColor: colors.sand200,
                opacity: p.dim ? 0.5 : 1,
              }}
            >
              <Avatar name={p.name} tone={p.tone} size={38} />
              <Text style={[type.body, { fontSize: 15, fontFamily: fonts.body600, flex: 1 }]}>
                {p.name}
              </Text>
              <Chip tone={p.chip}>{p.status}</Chip>
            </View>
          ))}
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
          <Icon name="info" size={17} color={colors.wald500} style={{ marginTop: 1 }} />
          <Text style={[type.sm, { flex: 1 }]}>
            Oma Anna hat zugesagt. Du kannst bis Mi, 14:02 widersprechen — sonst gilt ihre Zusage.
          </Text>
        </View>
        <View style={{ marginTop: 'auto', gap: 10, paddingBottom: spacing.s2 }}>
          <Button size="large" onPress={() => onResult('bestätigt')}>
            Passt für mich
          </Button>
          <Button variant="tertiary" size="large" onPress={() => onResult('übernommen')}>
            Ich übernehme lieber selbst
          </Button>
        </View>
      </View>
    </Sheet>
  );
}
