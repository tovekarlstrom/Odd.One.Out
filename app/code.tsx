import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CopyComponent } from "@/components/CopyComponent";
import { useEffect, useState } from "react";
import { ButtonComponent } from "@/components/ButtonComponent";
import { JoinedPlayers } from "@/components/JoinedPlayers";
import { GradientContainer } from "@/components/GradientContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadGameCode = async () => {
  try {
    const roomId = await AsyncStorage.getItem("roomId");

    if (!roomId) {
      console.error("No roomId in storage");
      return null;
    }

    return roomId;
  } catch (e) {
    console.error("Error loading from storage", e);
    return null;
  }
};

export default function Code() {
  const [gameCode, setGameCode] = useState("");

  useEffect(() => {
    const fetchGameCode = async () => {
      const roomCode = await loadGameCode();
      if (roomCode) {
        setGameCode(roomCode);
      }
    };
    fetchGameCode();
  }, []);

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="heading32">
            The stage is set! Start when you're ready.
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
