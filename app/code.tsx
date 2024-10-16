import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CopyComponent } from "@/components/CopyComponent";
import { useEffect, useState } from "react";
import { ButtonComponent } from "@/components/ButtonComponent";
import { JoinedPlayers } from "@/components/JoinedPlayers";
import { GradientContainer } from "@/components/GradientContainer";

export default function Code() {
  const [gameCode, setGameCode] = useState("");

  useEffect(() => {
    const code = Math.random().toString(36).substring(4);
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
          <JoinedPlayers heading="Joined Players" topPlayers />
        </View>
      </ParallaxScrollView>
      <GradientContainer>
        <ButtonComponent text="Start Game" variant="primary" route="/game" />
      </GradientContainer>
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
    marginBottom: 70,
  },
});
