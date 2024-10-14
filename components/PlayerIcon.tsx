import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../assets/playerIcon.svg";

export default function PlayerIcon() {
  return (
    <View style={styles.container}>
      <Icon width={80} height={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
