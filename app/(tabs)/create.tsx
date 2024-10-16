import { StyleSheet, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AddQuestion } from "@/components/AddQuestion";
import { AddedQuestions } from "@/components/AddedQuestions";
import { Colors } from "@/constants/Theme";
import { ButtonComponent } from "@/components/ButtonComponent";
import { LinearGradient } from "expo-linear-gradient";
import { GradientContainer } from "@/components/GradientContainer";

export default function TabThreeScreen() {
  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="heading32">
            Enter <Text style={styles.titleSpan}>questions</Text> to challenge
            the crowd.
          </ThemedText>
        </ThemedView>
        <AddQuestion />

        <AddedQuestions />
      </ParallaxScrollView>
      <GradientContainer>
        <ButtonComponent text="Create Game" variant="primary" route="/code" />
      </GradientContainer>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 70,
    width: "90%",
  },
  titleSpan: {
    color: Colors.light.contrastBlue,
  },
});
