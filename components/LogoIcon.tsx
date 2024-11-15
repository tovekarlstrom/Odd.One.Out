import React from "react";
import { TouchableOpacity, ViewProps } from "react-native";
import Icon from "../assets/oddOneOutIcon.svg";
import { router } from "expo-router";
import { ThemedView } from "./ThemedView";

export type IconProps = ViewProps & {
  size: number;
};

export default function LogoIcon({ size, style }: IconProps) {
  return (
    <ThemedView style={[style]}>
      <TouchableOpacity
        onPress={() => {
          router.push("/");
        }}
        activeOpacity={1}
      >
        <Icon width={size} height={size} />
      </TouchableOpacity>
    </ThemedView>
  );
}
