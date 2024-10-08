import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import { Colors } from "@/constants/Colors";

type ButtonVariant = "primary" | "secondary";

interface ButtonComponentProps {
  text: string;
  variant: ButtonVariant;
}
export function ButtonComponent({ variant, text }: ButtonComponentProps) {
  const buttonColor =
    variant === "primary" ? Colors.light.primaryButton : "#F2F2F2";
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={() => Alert.alert("Button pressed")}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
    width: 285,
    height: 55,
  },
  buttonText: {
    color: "#231F20",
    fontSize: 20,
    fontWeight: "bold",
  },
});
