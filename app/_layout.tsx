import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QuestionsProvider } from "@/contexts/QuestionsProvider";
import { AnswersProvider } from "@/contexts/AnswersProvider";
import { ThemedView } from "@/components/ThemedView";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pages = ["index", "code", "game", "create"];
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
            {pages.map((page) => (
              <Stack.Screen
                key={page}
                name={page}
                options={{ headerShown: false }}
              />
            ))}
            <Stack.Screen name="+not-found" />
          </Stack>
          {/* <ThemedView style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Text>Back</Text>
            </TouchableOpacity>
          </ThemedView> */}
        </AnswersProvider>
      </QuestionsProvider>
    </ThemeProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     height: 40,
//     width: "100%",
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
// });
