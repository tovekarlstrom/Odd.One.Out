import {
  StyleSheet,
  Platform,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonComponent } from "@/components/ButtonComponent";
import { useRouter } from "expo-router";
import { Colors, Sizes } from "@/constants/Theme";
import { useState } from "react";

export default function HomeScreen() {
  const [openLearnMore, setOpenlearnMore] = useState<boolean>(false);
  const clickLearnMore = () => {
    setOpenlearnMore(!openLearnMore);
  };
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
          <ButtonComponent text={"Join Game"} variant="primary" route="/game" />
          <ButtonComponent
            text={"Create Game"}
            variant="secondary"
            route="/create"
          />
        </ThemedView>
      </ParallaxScrollView>
      <ThemedView
        style={
          openLearnMore ? styles.learnMoreBoxOpen : styles.learnMoreBoxClosed
        }
      >
        <TouchableOpacity onPress={clickLearnMore}>
          <ThemedText style={styles.learnMoreText}>Learn more</ThemedText>
        </TouchableOpacity>
      </ThemedView>
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
  learnMoreBoxClosed: {
    position: "absolute",
    bottom: 0,
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.light.Card,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  learnMoreBoxOpen: {
    position: "absolute",
    bottom: 0,
    height: 500,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.light.Card,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  learnMoreText: {
    marginTop: Sizes.Spacings.medium,
  },
});
