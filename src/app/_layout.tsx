/**
 * Root-Layout — lädt die Copara-Schriften, hält den nativen Splash bis dahin,
 * zeigt danach den Signatur-Startbildschirm und die globalen Overlays
 * (Anfrage-Sheet vom Plus-FAB, Toast).
 */
import {
  BricolageGrotesque_500Medium,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
} from '@expo-google-fonts/bricolage-grotesque';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Toast } from '@/components/Toast';
import { RequestSheet } from '@/components/sheets/RequestSheet';
import { Splash } from '@/screens/Splash';
import { AppStateProvider, useAppState } from '@/state/app-state';
import { colors } from '@/theme/tokens';

SplashScreen.preventAutoHideAsync();

function GlobalOverlays() {
  const { requestOpen, setRequestOpen, toast, flash } = useAppState();
  return (
    <>
      <RequestSheet
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        onSent={() => {
          setRequestOpen(false);
          flash('Anfrage gesendet');
        }}
      />
      <Toast message={toast} />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_500Medium,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    JetBrainsMono_400Regular,
  });
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppStateProvider>
      <View style={{ flex: 1, backgroundColor: colors.sand50 }}>
        <StatusBar style={introDone ? 'dark' : 'light'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.sand50 },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="konto" />
          <Stack.Screen name="oma" />
        </Stack>
        <GlobalOverlays />
        {!introDone ? <Splash onDone={() => setIntroDone(true)} /> : null}
      </View>
    </AppStateProvider>
  );
}
