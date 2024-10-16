import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { Colors, Sizes } from "@/constants/Theme";
import LogoIcon from "./LogoIcon";

export default function ParallaxScrollView({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <LogoIcon size={60} />
      </ThemedView>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 100,
    display: "flex",
    padding: Sizes.Spacings.small,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  content: {
    paddingTop: 50,
    flex: 1,
    padding: 24,
    gap: 16,
    overflow: "hidden",
  },
});
