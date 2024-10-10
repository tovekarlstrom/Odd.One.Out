import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AddQuestion } from "@/components/AddQuestion";
import { AddedQuestions } from "@/components/AddedQuestions";

export default function TabThreeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="heading32">
          Enter questions to challenge the crowd
        </ThemedText>
      </ThemedView>
      <ThemedText>Add content</ThemedText>
      <AddQuestion />
      <AddedQuestions />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
