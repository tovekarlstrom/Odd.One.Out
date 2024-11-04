import { ButtonComponent } from "@/components/ButtonComponent";
import { CardComponent } from "@/components/CardComponent";
import { StyleSheet } from "react-native";
import { GradientContainer } from "@/components/GradientContainer";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import PlayerIcon from "@/components/PlayerIcon";
import { TextField } from "@/components/TextField";
import { addPoints } from "@/functions/addPoints";
import { getAnswer } from "@/functions/getAnswer";
import { getPlayers } from "@/functions/getPlayers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Player } from "./code";
import { Colors, Sizes } from "@/constants/Theme";
import { getOrUpdateStatus } from "@/functions/getOrUpdateStatus";
import Loading from "@/components/Loading";
import { JoinedPlayers } from "@/components/JoinedPlayers";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Answers() {
  // const [players, setPlayers] = useState<Player[]>([]);

  // const getPlayerName = (playerId: string) => {
  //   if (!players.length) return "";
  //   const player = players.find((player) => player.playerId === playerId);
  //   return player ? player.playerName : "Unknown Player";
  // };

  const players = [
    { playerName: "Klara", points: 3, isAdmin: false, playerId: "jfe739s" },
    { playerName: "Tove", points: 5, isAdmin: false, playerId: "jfe7ksws" },
    { playerName: "Allan", points: 8, isAdmin: false, playerId: "o4e739s" },
    { playerName: "Ruben", points: 2, isAdmin: false, playerId: "jf9f39s" },
    { playerName: "Edvin", points: 0, isAdmin: false, playerId: "jfe73cf" },
  ];

  // useEffect(() => {
  //   const getAnswers = async () => {
  //     const documentId = await AsyncStorage.getItem("gameRoom");
  //     if (documentId) {
  //       getPlayers(documentId, setPlayers);
  //     }
  //   };
  //   getAnswers();
  // }, []);

  const playerGetPoints: string[] = [];

  const enterPoints = async () => {
    const documentId = await AsyncStorage.getItem("gameRoom");
    if (playerGetPoints.length > 0) {
      if (documentId) {
        addPoints(documentId, playerGetPoints);
      }
    } else {
      console.log("No marked answes, no points added");
    }
  };

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.textBox}>
          <ThemedText type="heading32">Congratulations, Allan!</ThemedText>
          <ThemedText>You've claimed the top spot on the podium.</ThemedText>
        </ThemedView>
        <View style={{ paddingTop: Sizes.Spacings.large }}>
          <JoinedPlayers
            players={players}
            heading="Players"
            showPoints={true}
          />
        </View>
      </ParallaxScrollView>
      <GradientContainer>
        <ButtonComponent text="Create a new game" variant="primary" route="/" />
      </GradientContainer>
    </>
  );
}

const styles = StyleSheet.create({
  textBox: {
    margin: "auto",
    gap: 15,
  },
});
