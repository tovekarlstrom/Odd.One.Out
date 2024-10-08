import {
  type TextProps,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export type RoundButtonProps = TextProps & {
  isAdding: boolean;
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

function onPressButton(isAdding: boolean) {
  if (isAdding) {
    alert("It is added");
  } else {
    alert("It is removed");
  }
}

export function RoundButton({
  isAdding,
  lightColor,
  darkColor,
}: RoundButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onPressButton(isAdding);
      }}
    >
      <Ionicons
        name={isAdding ? "add-outline" : "remove-outline"}
        size={30}
        color={Colors.light.text}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.addButton,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
    borderRadius: 50,
  },
});
