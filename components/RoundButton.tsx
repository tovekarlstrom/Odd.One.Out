import { type TextProps, StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";

export type RoundButtonProps = TextProps & {
  isAdding: boolean;
};

function onPressButton(isAdding: boolean) {
  if (isAdding) {
    alert("It is added");
  } else {
    alert("It is removed");
  }
}

export function RoundButton({ isAdding }: RoundButtonProps) {
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
