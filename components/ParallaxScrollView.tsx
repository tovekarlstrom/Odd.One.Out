import { StyleSheet } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { Colors, Sizes } from "@/constants/Theme";
import LogoIcon from "./LogoIcon";

export default function ParallaxScrollView({
  children,
  isHomePage,
}: {
  children: React.ReactNode;
  isHomePage?: boolean;
}) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <ThemedView style={isHomePage ? styles.homePage : styles.container}>
      <LogoIcon style={styles.header} size={60} />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  homePage: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 80,
  },
  header: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 10,
  },
  content: {
    paddingTop: 100,
    flex: 1,
    padding: Sizes.Spacings.large,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});
