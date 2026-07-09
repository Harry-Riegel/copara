/**
 * Fokus-Modus — reiner Anzeige-Modus: zeigt immer nur EINE Sache.
 * Zähler, ein Auftrag (Status-Ampel), ein Knopf, „Später — kommt ans Ende".
 * Endzustand IMMER die Garantie-Karte: „Das war alles. Du hast nichts übersehen."
 */
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { StatusAmpel } from '@/components/StatusAmpel';
import { AnswerSheet } from '@/components/sheets/AnswerSheet';
import { BroadcastSheet } from '@/components/sheets/BroadcastSheet';
import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { Task } from '@/data/scenarios';
import { useAppState } from '@/state/app-state';
import { ampel, colors, fonts, radius } from '@/theme/tokens';
import { type } from '@/theme/type';

export function FocusTodo() {
  const router = useRouter();
  const { scenario, setFocus } = useAppState();
  const [queue, setQueue] = useState<string[]>(scenario.tasks.map((x) => x.id));
  const [sheetTask, setSheetTask] = useState<Task | null>(null);

  useEffect(() => setQueue(scenario.tasks.map((x) => x.id)), [scenario.id]);

  const total = scenario.tasks.length;
  const current = queue.length
    ? scenario.tasks.find((x) => x.id === queue[0]) ?? null
    : null;
  const doneCount = total - queue.length;
  const remainingAfter = queue.length - 1;

  const answerDone = () => {
    setSheetTask(null);
    setQueue((q) => q.slice(1));
  };
  const later = () => setQueue((q) => (q.length > 1 ? [...q.slice(1), q[0]] : q));

  return (
    <View style={{ flex: 1, backgroundColor: colors.sand50 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Fokus-Kopf: minimal, kein Gruß */}
        <View
          style={{
            paddingTop: 64,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="sun" size={18} color={colors.wald700} />
            <Text style={{ fontFamily: fonts.body600, fontSize: 15, color: colors.wald700 }}>
              Fokus
            </Text>
          </View>
          <Pressable accessibilityLabel="Konto" onPress={() => router.push('/konto')}>
            <Avatar name="Lisa Wagner" tone="wald" size={38} />
          </Pressable>
        </View>

        <View style={{ flex: 1, paddingTop: 28, paddingHorizontal: 20 }}>
          {current ? (
            <View style={{ marginTop: 8 }}>
              <Text
                style={[
                  type.overline,
                  {
                    letterSpacing: 0.88,
                    color: colors.ink400,
                    textAlign: 'center',
                    marginBottom: 18,
                  },
                ]}
              >
                {doneCount + 1} von {total}
              </Text>
              <StatusAmpel
                state="now"
                headline={current.focusHeadline || current.title}
                context={current.ctx}
                actionLabel={current.broadcast ? 'Ansehen' : 'Antworten'}
                onAction={() => setSheetTask(current)}
              />
              <Pressable
                onPress={later}
                style={{
                  alignSelf: 'center',
                  marginTop: 16,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
              >
                <Text style={{ fontFamily: fonts.body500, fontSize: 14, color: colors.ink400 }}>
                  Auf später verschieben
                </Text>
              </Pressable>
              <Text style={[type.caption, { textAlign: 'center', marginTop: 22 }]}>
                {remainingAfter > 0
                  ? `Danach ${
                      remainingAfter === 1
                        ? 'ist noch eine Sache übrig'
                        : `sind noch ${remainingAfter} Sachen übrig`
                    }.`
                  : 'Danach bist du fertig.'}
              </Text>
            </View>
          ) : (
            /* Garantie-Karte */
            <View style={{ marginVertical: 'auto' }}>
              <LinearGradient
                colors={ampel.clear.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.64, y: 1 }}
                style={{
                  borderRadius: radius.lg,
                  paddingHorizontal: 22,
                  paddingTop: 26,
                  paddingBottom: 24,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  <Icon name="check" size={26} color={ampel.clear.ink} />
                </View>
                <Text
                  style={{
                    fontFamily: fonts.heading700,
                    fontSize: 26,
                    lineHeight: 31,
                    color: ampel.clear.ink,
                    textAlign: 'center',
                  }}
                >
                  Das war alles.
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.body400,
                    fontSize: 14.5,
                    lineHeight: 22,
                    color: ampel.clear.sub,
                    marginTop: 10,
                    textAlign: 'center',
                  }}
                >
                  Du hast nichts übersehen. Copara meldet sich, wenn etwas Neues dazukommt.
                </Text>
              </LinearGradient>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 16,
                  paddingHorizontal: 4,
                }}
              >
                <Icon name="calendar" size={17} color={colors.ink400} />
                <Text style={[type.sm, { flex: 1 }]}>
                  Als Nächstes: in 6 Tagen — Mo, 16. Feb, 8:00 · Übergabe Schule.
                </Text>
              </View>
            </View>
          )}

          <Pressable
            onPress={() => setFocus(false)}
            style={{
              marginTop: 'auto',
              paddingTop: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.body500, fontSize: 13, color: colors.ink400 }}>
              Fokus-Modus verlassen
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {current?.broadcast ? (
        <BroadcastSheet open={!!sheetTask} onClose={() => setSheetTask(null)} onResult={answerDone} />
      ) : (
        <AnswerSheet
          open={!!sheetTask}
          task={sheetTask}
          onClose={() => setSheetTask(null)}
          onDone={answerDone}
        />
      )}
    </View>
  );
}
