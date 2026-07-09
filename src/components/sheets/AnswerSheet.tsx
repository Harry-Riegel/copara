/**
 * Antworten — nie „Ablehnen": Bestätigen / Gegenvorschlag / Später.
 */
import { Text, View } from 'react-native';

import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Sheet } from '@/components/ui/Sheet';
import { Task } from '@/data/scenarios';
import { colors, radius, spacing } from '@/theme/tokens';
import { type } from '@/theme/type';

export function AnswerSheet({
  open,
  task,
  onClose,
  onDone,
}: {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onDone: () => void;
}) {
  if (!task) return null;
  const broadcast = task.who === 'Broadcast';
  return (
    <Sheet open={open} onClose={onClose} height={0.66} scrollable={false}>
      <View style={{ flex: 1, gap: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Avatar name={broadcast ? 'An Alle' : task.who} tone={task.tone} size={44} />
          <View style={{ flex: 1 }}>
            <Text style={type.caption}>
              {broadcast ? 'Frage an alle' : `${task.kind} von ${task.who}`}
            </Text>
            <Text style={[type.h2, { fontSize: 20, lineHeight: 26, marginTop: 2 }]}>
              {task.title}
            </Text>
          </View>
        </View>
        <Text style={type.sm}>{task.ctx}</Text>
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
            {broadcast
              ? 'Erste Zusage gewinnt · du kannst 24 h widersprechen.'
              : 'Tust du nichts, bleibt die Anfrage offen — kein Druck.'}
          </Text>
        </View>
        <View style={{ marginTop: 'auto', gap: 10, paddingBottom: spacing.s2 }}>
          <Button size="large" onPress={onDone}>
            {broadcast ? 'Ich übernehme' : 'Bestätigen'}
          </Button>
          <Button variant="secondary" size="large" onPress={onDone}>
            Gegenvorschlag
          </Button>
          <Button variant="tertiary" size="large" onPress={onClose}>
            Später
          </Button>
        </View>
      </View>
    </Sheet>
  );
}
