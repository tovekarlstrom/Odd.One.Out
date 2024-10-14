import { StyleSheet, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AddQuestion } from "@/components/AddQuestion";
import { AddedQuestions } from "@/components/AddedQuestions";
import { Colors } from "@/constants/Theme";
import { ButtonComponent } from "@/components/ButtonComponent";
import { LinearGradient } from "expo-linear-gradient";

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
      <LinearGradient
        colors={["rgba(235, 222, 214, 0)", Colors.light.background]}
        locations={[0.02, 0.41]}
        style={styles.buttonContainer}
      >
        <ButtonComponent
          text="Create Game"
          variant="primary"
          route={"/explore"}
        />
      </LinearGradient>
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

  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    paddingTop: 15,
    alignItems: "center",
  },
});
