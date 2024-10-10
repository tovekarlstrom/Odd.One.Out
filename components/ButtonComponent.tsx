import { Colors, Sizes } from "@/constants/Theme";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import { Href, useRouter } from "expo-router";

type ButtonVariant = "primary" | "secondary";

interface ButtonComponentProps {
  text: string;
  variant: ButtonVariant;
  route: Href<string | object>;
}
export function ButtonComponent({
  variant,
  text,
  route,
}: ButtonComponentProps) {
  const router = useRouter();
  const buttonColor =
    variant === "primary"
      ? Colors.light.primaryButton
      : Colors.light.secondaryButton;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={() => router.push(route)}
    >
      <ThemedText style={styles.buttonText} type="defaultSemiBold">
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: Sizes.Spacings.medium,
    borderRadius: 80,
    width: 285,
    height: 55,
  },
  buttonText: {
    fontWeight: 600,
  },
});
