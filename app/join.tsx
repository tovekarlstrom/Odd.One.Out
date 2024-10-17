import { StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { ButtonComponent } from "@/components/ButtonComponent";
import { Sizes } from "@/constants/Theme";
import { CardComponent } from "@/components/CardComponent";
import { InputComponent } from "@/components/InputComponent";

export default function Join() {
  const [gameCode, setGameCode] = useState("");

  const handleNewGame = (text: string) => {
    setGameCode(text);
  };
  const joinGame = () => {
    alert("Joined the game");
  };

  return (
    <>
      <ParallaxScrollView>
        <View style={styles.titleContainer}>
          <ThemedText type="heading32">Ready to play?</ThemedText>
          <ThemedText type="default">
            Your task is to match the majority's answers—let’s see how well you
            can sync up!
          </ThemedText>
        </View>
        <View style={{ marginVertical: 40 }}>
          <CardComponent heading="Enter game code" fullWidth>
            <InputComponent
              placeholder="Code"
              onChangeText={handleNewGame}
              value={gameCode}
              onSubmitEditing={joinGame}
            />
            <ButtonComponent
              variant="primary"
              text="Join Game"
              route={"/game"}
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
