import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Sizes } from "@/constants/Theme";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

export function CopyComponent({ gameCode }: { gameCode: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setStringAsync(gameCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Pressable style={styles.button} onPress={copyToClipboard}>
        {copied ? (
          <ThemedText style={styles.buttonText} type="defaultSemiBold">
            Copied!
          </ThemedText>
        ) : (
          <ThemedText style={styles.buttonText} type="defaultSemiBold">
            {gameCode}
          </ThemedText>
        )}

        <Ionicons
          style={styles.copy}
          name={copied ? "checkmark-outline" : "copy-outline"}
          size={18}
          color={Colors.light.addButton}
        />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.contrastBlue,
    padding: Sizes.Spacings.small,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 285,
    height: 55,
    margin: "auto",
    position: "relative",
  },
  buttonText: {
    color: Colors.light.addButton,
  },
  copy: {
    position: "absolute",
    right: Sizes.Spacings.medium,
  },
});
