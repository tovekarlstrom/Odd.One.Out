import { StyleSheet, ImageBackground } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonComponent } from "@/components/ButtonComponent";
import { Sizes } from "@/constants/Theme";
import LearnMore from "@/components/LearnMore";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/startBackground.png")}
      resizeMode="cover"
      style={styles.backGround}
    >
      <ParallaxScrollView isHomePage={true}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            Blend in or stand out - What's your strategy?
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="default">
            It's not about what's right, it's about what most people think.
            Let's get started!
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ButtonComponent text={"Join Game"} variant="primary" route="/join" />
          <ButtonComponent
            text={"Create Game"}
            variant="secondary"
            route="/create"
          />
        </ThemedView>
      </ParallaxScrollView>
      <LearnMore />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginVertical: Sizes.Spacings.medium,
  },
  backGround: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
});
