import { Colors, Sizes } from "@/constants/Theme";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
interface CardProps {
  children: React.ReactNode;
  heading: string;
  fullWidth?: boolean;
}
export function CardComponent({ children, heading, fullWidth }: CardProps) {
  return (
    <View style={[styles.card, fullWidth && styles.fullCard]}>
      <ThemedText style={styles.text} type="defaultLarge">
        {heading}
      </ThemedText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.Card,
    borderRadius: 30,
    padding: Sizes.Spacings.xLarge,
    gap: 8,
    width: 285,
    margin: "auto",
    alignItems: "center",
  },
  fullCard: {
    width: "100%",
  },
  text: {
    width: "100%",
    textAlign: "left",
    marginBottom: Sizes.Spacings.small,
  },
});
