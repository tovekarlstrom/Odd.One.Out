import { CardComponent } from "@/components/CardComponent";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { getPlayers } from "@/functions/getPlayers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { View, Text, Vibration } from "react-native";
import { Player } from "./code";
import { TextField } from "@/components/TextField";
import PlayerIcon from "@/components/PlayerIcon";
import { GradientContainer } from "@/components/GradientContainer";
import { ButtonComponent } from "@/components/ButtonComponent";
export default function RoundResult() {
  const [scored, setScored] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const getTopPlayers = async () => {
    const gameRoom = await AsyncStorage.getItem("gameRoom");
    if (gameRoom) {
      getPlayers(gameRoom, setPlayers);
      const topPlayers = players
        .sort((a, b) => (a.points || 0) - (b.points || 0))
        .reverse();
      setTopPlayers(topPlayers.slice(0, 3));
    }
  };

  useEffect(() => {
    getTopPlayers();
  }, []);
  const checkIfLastQuestion = async () => {};
  const pushingNextRound = () => {
    let count = 5;
    const intervalId = setInterval(() => {
      count -= 1;
      Vibration.vibrate(SCORE_PATTERN);
      console.log(count);
      if (count === 0) {
        console.log("Next round");
        clearInterval(intervalId);
      }
    }, 1000);
  };

  const ONE_SECOND_IN_MS = 1000;
  const SCORE_PATTERN = [500, 60, 500, 60, 500];
  const LOSS_PATTERN = [10 * ONE_SECOND_IN_MS];
  if (!scored) {
    Vibration.vibrate(LOSS_PATTERN);
  } else {
    Vibration.vibrate(SCORE_PATTERN);
  }
  return (
    <>
      <ParallaxScrollView>
        <View>
          <ThemedText type="heading32">
            {scored
              ? "You’re in sync with the group, points for you!"
              : "You went your own way, no points this time"}
          </ThemedText>
          {scored && (
            <ThemedText type="default">1 point added to your score</ThemedText>
          )}
          <CardComponent heading="Top 3 players" fullWidth>
            {topPlayers.map((player, index) => (
              <TextField
                key={index}
                value={player.playerName}
                points={player.points.toString()}
              >
                <PlayerIcon size={24} />
              </TextField>
            ))}
          </CardComponent>
        </View>
      </ParallaxScrollView>
      <GradientContainer>
        {isAdmin && (
          <ButtonComponent
            text="Next round"
            variant="primary"
            // route={!lastQuestion ? "/" : "/game"}
            onSubmit={pushingNextRound}
          />
        )}
      </GradientContainer>
    </>
  );
}
