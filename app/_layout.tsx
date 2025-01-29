import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import AbrilFatFace from '../assets/fonts/AbrilFatface.ttf';
import InstrumentSansRegular from '../assets/fonts/InstrumentSans-Regular.ttf';
import InstrumentSansSemiBold from '../assets/fonts/InstrumentSans-SemiBold.ttf';
import InstrumentSansBold from '../assets/fonts/InstrumentSans-Bold.ttf';
import { useColorScheme } from '@/hooks/useColorScheme';
import { QuestionsProvider } from '@/contexts/QuestionsProvider';
import { QueryClientProvider } from 'react-query';
import queryClient from '@/contexts/queryClient';
import { StartAnimation } from '@/components/StartAnimation';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pages = [
    'index',
    'code',
    'game',
    'create',
    'join',
    'answers',
    'scoreboard',
    'result',
    'scanCode',
  ];
  const [loaded] = useFonts({
    'Abril Fat': AbrilFatFace,
    'Instrument Sans Regular': InstrumentSansRegular,
    'Instrument Sans SemiBold': InstrumentSansSemiBold,
    'Instrument Sans Bold': InstrumentSansBold,
  });
  const [appReady, setAppReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [loaded]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <QuestionsProvider>
          {appReady && animationFinished ? (
            <Stack screenOptions={{ animation: 'none' }}>
              {pages.map((page) => (
                <Stack.Screen
                  key={page}
                  name={page}
                  options={{ headerShown: false }}
                />
              ))}
              <Stack.Screen name='+not-found' />
            </Stack>
          ) : null}
          {(!appReady || !animationFinished) && (
            <StartAnimation onAnimationEnd={() => setAnimationFinished(true)} />
          )}
        </QuestionsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
