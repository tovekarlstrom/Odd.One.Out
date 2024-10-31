import React from "react";
import { View, StyleSheet } from "react-native";
import IconGreen from "../assets/playerIcon.svg";
import IconOrange from "../assets/icon2.svg";
import IconBlue from "../assets/icon3.svg";

interface IconProps {
  size: number;
  color?: string;
}

export default function PlayerIcon({ size, color }: IconProps) {
  return (
    <View style={styles.container}>
      {color === "blue" ? (
        <IconBlue width={size} height={size} />
      ) : color === "orange" ? (
        <IconOrange width={size} height={size} />
      ) : (
        <IconGreen width={size} height={size} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
