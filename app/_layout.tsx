import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QuestionsProvider } from "@/contexts/QuestionsProvider";
import { QueryClientProvider } from "react-query";
import queryClient from "@/contexts/queryClient";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pages = [
    "index",
    "code",
    "game",
    "create",
    "join",
    "answers",
    "scoreboard",
    "result",
  ];
  const [loaded] = useFonts({
    "Abril Fat": require("../assets/fonts/AbrilFatface.ttf"),
    "Instrument Sans Regular": require("../assets/fonts/InstrumentSans-Regular.ttf"),
    "Instrument Sans SemiBold": require("../assets/fonts/InstrumentSans-SemiBold.ttf"),
    "Instrument Sans Bold": require("../assets/fonts/InstrumentSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <QuestionsProvider>
          <Stack screenOptions={{ animation: "none" }}>
            {pages.map((page) => (
              <Stack.Screen
                key={page}
                name={page}
                options={{ headerShown: false }}
              />
            ))}
            <Stack.Screen name="+not-found" />
          </Stack>
        </QuestionsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
