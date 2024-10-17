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
import { Ionicons } from "@expo/vector-icons";

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
          <ThemedView style={styles.learnMoreButton}>
            <Ionicons
              name={
                openLearnMore ? "chevron-down-outline" : "chevron-up-outline"
              }
              size={20}
              color={Colors.light.text}
            />
            <ThemedText type="link" style={styles.learnMoreText}>
              Learn more
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
        {openLearnMore && (
          <>
            <ThemedView style={styles.learnMoreContainer}>
              <ThemedText type="title">
                Learn more about Odd One Out!
              </ThemedText>
              <ThemedView style={styles.textBox}>
                <ThemedText type="defaultLarge">
                  Think oddly together
                </ThemedText>
                <ThemedText type="default">
                  In this mode, the goal is to NOT be the odd one out! Try to
                  think like the other players and give the same answer as
                  someone else. You'll only score points if someone else thinks
                  the same way. The challenge is to guess what others will
                  pick—can you predict what they'll choose?
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ButtonComponent
              text={"Create Game"}
              variant="primary"
              route="/create"
            />
          </>
        )}
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
    height: Platform.OS === "ios" ? 70 : 30,
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
    height: 700,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.light.Card,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  learnMoreButton: {
    marginTop: Sizes.Spacings.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },
  learnMoreText: {
    textAlign: "center",
  },
  learnMoreContainer: {
    padding: 30,
    paddingVertical: 100,
    height: 530,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textBox: {
    gap: Sizes.Spacings.medium,
  },
});
