/**
 * Schwebende Tab-Bar (linke Pille: To-Do · Kalender · Familie) + Plus-FAB (rechts).
 * Apricot-Punkt auf To-Do, solange etwas offen ist.
 */
import { Pressable, Text, View } from 'react-native';

import { useAppState } from '@/state/app-state';
import { colors, fonts, radius, shadows } from '@/theme/tokens';

import { Icon, IconName } from './ui/Icon';

const TABS: { name: string; icon: IconName; label: string }[] = [
  { name: 'index', icon: 'list-checks', label: 'To-Do' },
  { name: 'kalender', icon: 'calendar', label: 'Kalender' },
  { name: 'familie', icon: 'users', label: 'Familie' },
];

// Strukturelle Teilmenge der BottomTabBarProps (expo-router vendort
// react-navigation ohne öffentlichen Typ-Export).
interface TabBarProps {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: { navigate: (name: string) => void };
}

export function TabBar({ state, navigation }: TabBarProps) {
  const { scenario, setRequestOpen } = useAppState();
  const todoDot = scenario.tasks.length > 0;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        bottom: 26,
        left: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View
        style={[
          {
            flex: 1,
            height: 62,
            backgroundColor: colors.sand0,
            borderRadius: radius.pill,
            borderWidth: 1,
            borderColor: colors.sand200,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 6,
          },
          shadows.card,
        ]}
      >
        {TABS.map((tab) => {
          const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
          const on = state.index === routeIndex;
          return (
            <Pressable
              key={tab.name}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              onPress={() => navigation.navigate(tab.name)}
              style={{ alignItems: 'center', gap: 3, paddingVertical: 6, paddingHorizontal: 10 }}
            >
              <Icon name={tab.icon} size={23} color={on ? colors.wald700 : colors.ink400} />
              <Text
                style={{
                  fontFamily: on ? fonts.body600 : fonts.body500,
                  fontSize: 11,
                  color: on ? colors.wald700 : colors.ink400,
                }}
              >
                {tab.label}
              </Text>
              {tab.name === 'index' && todoDot && !on ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 10,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors.apricot500,
                  }}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>
      <Pressable
        accessibilityLabel="Anfrage stellen"
        onPress={() => setRequestOpen(true)}
        style={({ pressed }) => [
          {
            width: 62,
            height: 62,
            borderRadius: 31,
            backgroundColor: colors.wald700,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1,
          },
          shadows.fab,
        ]}
      >
        <Icon name="plus" size={28} color={colors.onDark} />
      </Pressable>
    </View>
  );
}
