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
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QuestionsProvider } from "@/contexts/QuestionsProvider";
import { AnswersProvider } from "@/contexts/AnswersProvider";
import { View } from "react-native/Libraries/Components/View/View";
import { ThemedText } from "@/components/ThemedText";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    AbrilFat: require("../assets/fonts/AbrilFatface-Regular.ttf"),
    InstrumentalSans: require("../assets/fonts/InstrumentSans-VariableFont_wdth,wght.ttf"),
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
      <QuestionsProvider>
        <AnswersProvider>
          <Stack screenOptions={{ animation: "none" }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="game" options={{ headerShown: false }} />
          </Stack>
          <ThemedText>Hewj ehejejej</ThemedText>
        </AnswersProvider>
      </QuestionsProvider>
    </ThemeProvider>
  );
}
