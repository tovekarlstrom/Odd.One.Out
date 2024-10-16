import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../assets/oddOneOutIcon.svg";
import { router } from "expo-router";

interface IconProps {
  size: number;
}

export default function LogoIcon({ size }: IconProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push("/");
        }}
        activeOpacity={1}
      >
        <Icon width={size} height={size} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
