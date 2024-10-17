import { StyleSheet, Platform, Button, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ButtonComponent } from "@/components/ButtonComponent";
import { Colors, Sizes } from "@/constants/Theme";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function LearnMore() {
  const [openLearnMore, setOpenlearnMore] = useState<boolean>(false);
  const clickLearnMore = () => {
    setOpenlearnMore(!openLearnMore);
  };

  return (
    <ThemedView
      style={
        openLearnMore ? styles.learnMoreBoxOpen : styles.learnMoreBoxClosed
      }
    >
      <TouchableOpacity onPress={clickLearnMore}>
        <ThemedView style={styles.learnMoreButton}>
          <Ionicons
            name={openLearnMore ? "chevron-down-outline" : "chevron-up-outline"}
            size={20}
            color={Colors.light.text}
          />
          <ThemedText type="link" style={styles.learnMoreText}>
            Learn more
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
      {openLearnMore && (
        <>
          <ThemedView style={styles.learnMoreContainer}>
            <ThemedText type="title">Learn more about Odd One Out!</ThemedText>
            <ThemedView style={styles.textBox}>
              <ThemedText type="defaultLarge">Think oddly together</ThemedText>
              <ThemedText type="default">
                In this mode, the goal is to NOT be the odd one out! Try to
                think like the other players and give the same answer as someone
                else. You'll only score points if someone else thinks the same
                way. The challenge is to guess what others will pick—can you
                predict what they'll choose?
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ButtonComponent
            text={"Create Game"}
            variant="primary"
            route="/create"
          />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  learnMoreBoxClosed: {
    position: "absolute",
    bottom: 0,
    height: Platform.OS === "ios" ? 70 : 30,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.light.Card,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  learnMoreBoxOpen: {
    position: "absolute",
    bottom: 0,
    height: 700,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.light.Card,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  learnMoreButton: {
    marginTop: Sizes.Spacings.xSmall,
    justifyContent: "center",
    alignItems: "center",
  },
  learnMoreText: {
    textAlign: "center",
  },
  learnMoreContainer: {
    padding: 30,
    paddingVertical: 100,
    height: 530,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textBox: {
    gap: Sizes.Spacings.medium,
  },
});
