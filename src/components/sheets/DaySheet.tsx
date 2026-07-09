/**
 * Tages-Sheet (Ändern per Tipp) — Änderungen gehen als ruhige Anfrage
 * an die Beteiligten, nichts wird überschrieben.
 */
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Sheet } from '@/components/ui/Sheet';
import { colors, fonts, radius, spacing } from '@/theme/tokens';
import { type } from '@/theme/type';

export function DaySheet({
  open,
  onClose,
  onRequest,
}: {
  open: boolean;
  onClose: () => void;
  onRequest: () => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} height={0.58} scrollable={false}>
      <View style={{ flex: 1, gap: 14 }}>
        <View>
          <Text style={type.caption}>bei dir</Text>
          <Text style={type.h2}>Donnerstag, 19. Februar</Text>
        </View>
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
            <Icon name="users" size={17} color={colors.ink600} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.ink900 }}>
              Abholung durch Oma Anna
            </Text>
            <Text style={type.sm}>15:30</Text>
          </View>
          <Pressable hitSlop={8}>
            <Text style={{ fontFamily: fonts.body600, fontSize: 14, color: colors.wald700 }}>
              Ändern
            </Text>
          </Pressable>
        </View>
        <Text style={type.sm}>
          Änderungen gehen als ruhige Anfrage an die Beteiligten — nichts wird überschrieben.
        </Text>
        <View style={{ marginTop: 'auto', gap: 10, paddingBottom: spacing.s2 }}>
          <Button size="large" onPress={onRequest}>
            Wechsel für diesen Tag anfragen
          </Button>
          <Button variant="tertiary" size="large" onPress={onClose}>
            Später
          </Button>
        </View>
      </View>
    </Sheet>
  );
}
