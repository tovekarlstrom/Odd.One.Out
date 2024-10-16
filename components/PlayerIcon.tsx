import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../assets/playerIcon.svg";

interface IconProps {
  size: number;
}

export default function PlayerIcon({ size }: IconProps) {
  return (
    <View style={styles.container}>
      <Icon width={size} height={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
