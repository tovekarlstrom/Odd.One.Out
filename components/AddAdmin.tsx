import { StyleSheet, TouchableWithoutFeedback } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonComponent } from "@/components/ButtonComponent";
import { Colors, Sizes } from "@/constants/Theme";
import { useState } from "react";
import { createGameRoom } from "../functions/createGameRoom";
import { InputComponent } from "./InputComponent";
import { GradientContainer } from "./GradientContainer";
import SlideAnimation from "./SlideAnimation";

interface AddAdminProps {
  showAddAdmin: boolean;
  onClose: () => void;
}

export default function AddAdmin({ showAddAdmin, onClose }: AddAdminProps) {
  const [playerName, setPlayerName] = useState<string>("");

  const handlePress = async () => {
    if (playerName.length < 3) {
      alert("Your player name has to contain at least three characters");
    } else {
      await createGameRoom(playerName);
    }
  };

  return (
    <SlideAnimation
      height={300}
      showSlider={showAddAdmin}
      style={styles.addAdminBoxOpen}
      onClose={onClose}
    >
      <>
        <ThemedText type="heading24">Add your player name</ThemedText>
        <ThemedView style={styles.inputContainer}>
          <InputComponent
            placeholder="Name"
            onChangeText={(value) => {
              setPlayerName(value);
            }}
            value={playerName}
          />
        </ThemedView>
        <GradientContainer>
          <ButtonComponent
            onSubmit={handlePress}
            text="Create Game"
            variant="primary"
            route={playerName.length >= 3 ? "/code" : undefined}
          />
        </GradientContainer>
      </>
    </SlideAnimation>
  );
}

const styles = StyleSheet.create({
  addAdminBoxOpen: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Sizes.Spacings.xxLarge,
    backgroundColor: Colors.light.Card,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  inputContainer: {
    width: "100%",
    height: 100,
  },
});
