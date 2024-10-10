import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AddQuestion } from "@/components/AddQuestion";
import { AddedQuestions } from "@/components/AddedQuestions";
import { Colors } from "@/constants/Theme";
import { useState } from "react";
import { CardComponent } from "@/components/CardComponent";

export default function TabThreeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="heading32">
          Enter <Text style={styles.titleSpan}>questions</Text> to challenge the
          crowd
        </ThemedText>
      </ThemedView>
      <AddQuestion />
      <CardComponent heading="Added Questions">
        <AddedQuestions />
      </CardComponent>
      <CardComponent heading="Added Questions">
        <ThemedText type="heading32">Enter</ThemedText>
      </CardComponent>
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
    marginBottom: 70,
  },
  titleSpan: {
    color: Colors.light.contrastBlue,
  },
  card: {
    marginTop: 50,
    backgroundColor: Colors.light.Card,
    borderRadius: 20,
    padding: 15,
  },
});
