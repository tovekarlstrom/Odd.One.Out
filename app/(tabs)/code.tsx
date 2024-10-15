import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import PlayerIcon from "@/components/PlayerIcon";
import { AddAnswer } from "@/components/AddAnswer";
import { ThemedText } from "@/components/ThemedText";
import { CopyComponent } from "@/components/CopyComponent";
import { CardComponent } from "@/components/CardComponent";
import { useEffect, useState } from "react";
import { ButtonComponent } from "@/components/ButtonComponent";
import { JoinedPlayers } from "@/components/JoinedPlayers";
import { Sizes } from "@/constants/Theme";

export default function Code() {
  const [gameCode, setGameCode] = useState("");

  useEffect(() => {
    const code = Math.random().toString(36).substring(4);
    console.log(code);
    setGameCode(code);
  }, []);

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="heading32">
            The stage is set! Start when you’re ready.
          </ThemedText>
          <ThemedText type="default">
            Share the code with all players who need to join
          </ThemedText>
        </ThemedView>
        <CopyComponent gameCode={gameCode} />
        <View style={styles.cardContainer}>
          <JoinedPlayers />
        </View>
      </ParallaxScrollView>
      <View style={styles.buttonContainer}>
        <ButtonComponent text="Start Game" variant="primary" route="/game" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
    marginBottom: 35,
    width: "90%",
  },
  cardContainer: {
    marginTop: 35,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Sizes.Spacings.xLarge,
    paddingTop: Sizes.Spacings.medium,
    alignItems: "center",
  },
});
