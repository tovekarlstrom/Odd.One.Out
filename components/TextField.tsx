import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Sizes } from "@/constants/Theme";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useState } from "react";

interface TextFieldProps {
  value: string;
  children?: React.ReactNode;
  points?: number;
  isClickable?: boolean;
}

export function TextField({
  value,
  children,
  points,
  isClickable,
}: TextFieldProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const Wrapper: React.ElementType = isClickable ? TouchableOpacity : View;

  const onPress = () => {
    setIsClicked(!isClicked);
  };

  const styling =
    children && points
      ? styles.threeItems
      : children
      ? styles.twoItems
      : styles.textContainer;

  return (
    <Wrapper
      onPress={isClickable ? onPress : undefined}
      style={isClicked ? styles.clicked : styles.textBox}
    >
      <View style={styling}>
        {children ? (
          <ThemedView style={styles.innerBox}>
            {children}
            <ThemedText type="defaultSemiBold">{value}</ThemedText>
          </ThemedView>
        ) : (
          <ThemedText type="defaultSemiBold">{value}</ThemedText>
        )}
        {points && (
          <ThemedText style={styles.points} type="defaultSemiBold">
            {points}p
          </ThemedText>
        )}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  clicked: {
    borderRadius: 30,
    minHeight: 55,
    minWidth: 200,
    backgroundColor: Colors.light.activeTextField,
    padding: Sizes.Spacings.medium,
    width: "100%",
  },
  textBox: {
    borderRadius: 30,
    minHeight: 55,
    minWidth: 200,
    backgroundColor: Colors.light.background,
    padding: Sizes.Spacings.medium,
    width: "100%",
  },
  threeItems: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: Sizes.Spacings.small,
  },
  twoItems: {
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: Sizes.Spacings.small,
  },
  innerBox: {
    display: "flex",
    flexDirection: "row",
    gap: Sizes.Spacings.small,
  },
  points: {
    alignSelf: "flex-start",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
