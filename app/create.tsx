import { StyleSheet, Text, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AddQuestion } from "@/components/AddQuestion";
import { AddedQuestions } from "@/components/AddedQuestions";
import { Colors } from "@/constants/Theme";
import { ButtonComponent } from "@/components/ButtonComponent";
import { GradientContainer } from "@/components/GradientContainer";
import AddAdmin from "@/components/AddAdmin";
import { useState } from "react";
import BackdropContainer from "@/components/BackdropContainer";

export default function TabThreeScreen() {
  const [openAddAdmin, setOpenAddAdmin] = useState<boolean>(false);
  const [renderAdmin, setRenderAdmin] = useState<boolean>(false);

  const handlePress = () => {
    setOpenAddAdmin(true);
    setRenderAdmin(true);
  };

  const handleBackdropPress = () => {
    setOpenAddAdmin(false);
  };

  const handleAnimation = () => {
    setRenderAdmin(false);
  };

  return (
    <View style={styles.container}>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="heading32">
            Enter <Text style={styles.titleSpan}>questions</Text> to challenge
            the crowd.
          </ThemedText>
        </ThemedView>
        <AddQuestion />

        <AddedQuestions />
      </ParallaxScrollView>
      <GradientContainer>
        <ButtonComponent onSubmit={handlePress} text="Next" variant="primary" />
      </GradientContainer>
      {renderAdmin && (
        <BackdropContainer handleOnPress={handleBackdropPress}>
          <AddAdmin showAddAdmin={openAddAdmin} onClose={handleAnimation} />
        </BackdropContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 70,
    width: "90%",
  },
  titleSpan: {
    color: Colors.light.contrastBlue,
  },
});
