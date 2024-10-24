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
import { getGameRoom } from "@/functions/getGameRoom";
import { getPlayers } from "@/functions/getPlayers";

export interface Player {
  playerName: string;
  points: number;
  isAdmin: boolean;
  playerId: string;
}

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
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchGameCode = async () => {
      const roomCode = await loadGameCode();
      if (roomCode) {
        setGameCode(roomCode);
      }
    };
    fetchGameCode();
  }, []);

  useEffect(() => {
    if (gameCode) {
      const fetchAndListenToPlayers = async () => {
        const game = await getGameRoom(gameCode);
        if (game) {
          const unsubscribe = await getPlayers(game, setPlayers);
          return () => {
            if (unsubscribe) {
              unsubscribe();
            }
          };
        }
      };
      fetchAndListenToPlayers();
    }
  }, [gameCode]);

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
          <JoinedPlayers players={players} heading="Joined Players" />
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
