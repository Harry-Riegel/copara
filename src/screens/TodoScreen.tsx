/**
 * To-Do — alles, was eine Entscheidung braucht.
 * Status-Ampel oben → Aufgaben → eigene wartende Anfrage.
 * Szenario-Umschalter (Demo) zeigt die kanonischen Startseiten-Zustände.
 */
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { SectionLabel } from '@/components/SectionLabel';
import { AmpelProps, StatusAmpel } from '@/components/StatusAmpel';
import { AnswerSheet } from '@/components/sheets/AnswerSheet';
import { BroadcastSheet } from '@/components/sheets/BroadcastSheet';
import { Avatar } from '@/components/ui/Avatar';
import { Chip } from '@/components/ui/Chip';
import { Icon } from '@/components/ui/Icon';
import { Task, scenarios } from '@/data/scenarios';
import { useAppState } from '@/state/app-state';
import { colors, fonts, radius, shadows } from '@/theme/tokens';
import { type } from '@/theme/type';

export function TodoScreen() {
  const router = useRouter();
  const { scenario, setScenarioId, showDemo, setFocus, flash } = useAppState();
  const [answered, setAnswered] = useState<string[]>([]);
  const [sheetTask, setSheetTask] = useState<Task | null>(null);

  useEffect(() => setAnswered([]), [scenario.id]);

  const openTasks = scenario.tasks.filter((x) => !answered.includes(x.id));
  const hadTasks = scenario.tasks.length > 0;

  let ampelProps: AmpelProps;
  if (openTasks.length > 0 && answered.length === 0) {
    ampelProps = { ...scenario.ampel, onAction: () => setSheetTask(openTasks[0]) };
  } else if (openTasks.length > 0) {
    ampelProps = {
      state: 'now',
      headline: openTasks.length === 1 ? 'Noch eine Sache.' : `Noch ${openTasks.length} Dinge.`,
      context: 'Danach ist heute nichts mehr zu tun.',
      actionLabel: 'Weiter antworten',
      onAction: () => setSheetTask(openTasks[0]),
    };
  } else if (hadTasks) {
    ampelProps = {
      state: 'clear',
      headline: 'Das war alles.',
      context: 'Du hast nichts übersehen. Mia & Felix bei Markus, Emma bei Tom · in 6 Tagen dran.',
    };
  } else {
    ampelProps = { ...scenario.ampel };
  }

  const markAnswered = (task: Task, message: string) => {
    setAnswered((c) => [...c, task.id]);
    setSheetTask(null);
    flash(message);
  };

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
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={[
                type.caption,
                { marginBottom: 4, color: colors.ink600, fontSize: 13, fontFamily: fonts.body600 },
              ]}
            >
              Dienstag, 10. Februar
            </Text>
            <Text style={[type.h1, { fontSize: 34, lineHeight: 38 }]}>
              To-Do<Text style={{ color: colors.apricot500 }}>.</Text>
            </Text>
          </View>
          <Pressable accessibilityLabel="Konto" onPress={() => router.push('/konto')}>
            <Avatar name="Lisa Wagner" tone="wald" size={42} />
          </Pressable>
        </View>

        {/* Szenario-Umschalter (Demo) */}
        {showDemo ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 14 }}
            contentContainerStyle={{
              paddingHorizontal: 16,
              alignItems: 'center',
              gap: 6,
              paddingBottom: 4,
            }}
          >
            <Text style={[type.caption, { marginRight: 2 }]}>Demo</Text>
            {Object.values(scenarios).map((s) => {
              const on = s.id === scenario.id;
              return (
                <Pressable
                  key={s.id}
                  onPress={() => setScenarioId(s.id)}
                  style={{
                    height: 30,
                    paddingHorizontal: 12,
                    borderRadius: radius.pill,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: on ? 0 : 1,
                    borderColor: colors.sand200,
                    backgroundColor: on ? colors.ink900 : colors.sand0,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.body600,
                      fontSize: 12.5,
                      color: on ? colors.onDark : colors.ink600,
                    }}
                  >
                    {s.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : null}

        <View style={{ paddingTop: 12, paddingHorizontal: 16, gap: 16 }}>
          <StatusAmpel {...ampelProps} />

          {openTasks.length > 0 ? (
            <View>
              <SectionLabel>Was du entscheiden kannst</SectionLabel>
              <View style={{ gap: 10 }}>
                {openTasks.map((task) => {
                  const dot = task.tone === 'apricot' ? colors.apricot500 : colors.wald500;
                  const meta =
                    task.who === 'Broadcast' ? 'Frage an alle' : `${task.kind} von ${task.who}`;
                  return (
                    <Pressable
                      key={task.id}
                      onPress={() => setSheetTask(task)}
                      style={[
                        {
                          backgroundColor: colors.sand0,
                          borderRadius: radius.lg,
                          paddingHorizontal: 18,
                          paddingVertical: 16,
                          flexDirection: 'row',
                          gap: 12,
                          alignItems: 'flex-start',
                        },
                        shadows.card,
                      ]}
                    >
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 7,
                            marginBottom: 5,
                          }}
                        >
                          <View
                            style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dot }}
                          />
                          <Text style={[type.caption, { color: colors.ink600 }]} numberOfLines={1}>
                            {meta}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontFamily: fonts.body600,
                            fontSize: 16.5,
                            lineHeight: 21,
                            color: colors.ink900,
                          }}
                        >
                          {task.title}
                        </Text>
                        <Text style={[type.sm, { marginTop: 4 }]}>{task.ctx}</Text>
                      </View>
                      <Icon
                        name="chevron-right"
                        size={18}
                        color={colors.ink400}
                        style={{ marginTop: 2 }}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ) : null}

          {/* Eigene wartende Anfrage — passiv, bewusst zurückgenommen */}
          <View>
            <SectionLabel>Liegt bei Markus</SectionLabel>
            <View
              style={{
                backgroundColor: colors.sand0,
                borderRadius: radius.lg,
                borderWidth: 1,
                borderColor: colors.sand200,
                paddingHorizontal: 16,
                paddingVertical: 14,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    backgroundColor: colors.apricot300,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.body600, fontSize: 14, color: colors.ink600 }}>
                    Ferien 30. März – 3. April
                  </Text>
                  <Text style={[type.caption, { marginTop: 2 }]}>
                    Ohne Antwort fragen wir nach 24 h Oma & Opa.
                  </Text>
                </View>
                <Chip tone="neutral">offen</Chip>
              </View>
              <Pressable
                onPress={() => flash('Anfrage zurückgezogen')}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 12 }}
              >
                <Icon name="rotate-ccw" size={15} color={colors.ink400} />
                <Text style={{ fontFamily: fonts.body500, fontSize: 13, color: colors.ink400 }}>
                  Anfrage zurückziehen
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={() => setFocus(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              paddingVertical: 4,
            }}
          >
            <Icon name="sun" size={15} color={colors.ink400} />
            <Text style={{ fontFamily: fonts.body500, fontSize: 13, color: colors.ink400 }}>
              Fokus-Modus einschalten
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Sheets */}
      <AnswerSheet
        open={!!sheetTask && !sheetTask.broadcast}
        task={sheetTask && !sheetTask.broadcast ? sheetTask : null}
        onClose={() => setSheetTask(null)}
        onDone={() => sheetTask && markAnswered(sheetTask, 'Antwort gesendet')}
      />
      <BroadcastSheet
        open={!!sheetTask?.broadcast}
        onClose={() => setSheetTask(null)}
        onResult={(kind) =>
          sheetTask &&
          markAnswered(
            sheetTask,
            kind === 'übernommen' ? 'Du übernimmst den 28. Februar' : 'Omas Zusage bestätigt'
          )
        }
      />
    </View>
  );
}
