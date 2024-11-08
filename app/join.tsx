import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { ButtonComponent } from "@/components/ButtonComponent";
import { Sizes } from "@/constants/Theme";
import { CardComponent } from "@/components/CardComponent";
import { InputComponent } from "@/components/InputComponent";
import { addPlayers } from "../functions/addPlayers";
import { getGameRoom } from "@/functions/getGameRoom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getIconColorAndShape } from "@/utils/getIconColorAndShape";

export default function Join() {
  const [gameCode, setGameCode] = useState("");
  const [playerName, setPlayerName] = useState<string>("");

  const router = useRouter();

  const joinGame = async () => {
    const gameRoom = await getGameRoom(gameCode);

    if (playerName.length < 3) {
      alert("Your player name has to contain at least three characters");
    } else if (gameRoom) {
      const playerIcon = await getIconColorAndShape();
      await AsyncStorage.setItem("gameRoom", gameRoom);
      await addPlayers(gameRoom, playerName, playerIcon);
      await AsyncStorage.setItem("isAdmin", "false");
      router.push("/game");
    } else {
      alert("Wrong game code!");
    }
  };

  return (
    <>
      <ParallaxScrollView>
        <View style={styles.titleContainer}>
          <ThemedText type="heading32">Ready to play?</ThemedText>
          <ThemedText type="default">
            Your task is to match the majority's answers—let's see how well you
            can sync up!
          </ThemedText>
        </View>
        <View style={{ marginVertical: 40 }}>
          <CardComponent heading="Enter game code and your name" fullWidth>
            <InputComponent
              placeholder="Code"
              onChangeText={(value) => {
                setGameCode(value);
              }}
              value={gameCode}
            />
            <InputComponent
              placeholder="Name"
              onChangeText={(value) => {
                setPlayerName(value);
              }}
              value={playerName}
            />
            <ButtonComponent
              variant="primary"
              text="Join Game"
              onSubmit={joinGame}
            />
          </CardComponent>
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: Sizes.Spacings.small,
    marginBottom: 35,
    width: "90%",
  },
  cardContainer: {
    marginTop: 35,
    marginBottom: 70,
  },
});
