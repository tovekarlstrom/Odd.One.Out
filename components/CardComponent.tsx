import { Colors } from "@/constants/Theme";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
interface CardProps {
  children: React.ReactNode;
  heading: string;
}
export function CardComponent({ children, heading }: CardProps) {
  return (
    <View style={styles.card}>
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
    padding: 25,
  },
  text: {
    marginBottom: 12,
  },
});
