import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import PlayerIcon from "./PlayerIcon";
import { Colors, Sizes } from "@/constants/Theme";

export default function LoadingIcons() {
  const bounce1 = useRef(new Animated.Value(0)).current;
  const bounce2 = useRef(new Animated.Value(0)).current;
  const bounce3 = useRef(new Animated.Value(0)).current;

  const bounceAnimation = (animation: Animated.Value) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );
  };

  useEffect(() => {
    bounceAnimation(bounce1).start();
    setTimeout(() => bounceAnimation(bounce2).start(), 150);
    setTimeout(() => bounceAnimation(bounce3).start(), 300);
  }, []);

  return (
    <ThemedView style={styles.iconBox}>
      <Animated.View style={{ transform: [{ translateY: bounce1 }] }}>
        <PlayerIcon size={50} color={Colors.light.iconOrange} shape="star" />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: bounce2 }] }}>
        <PlayerIcon size={50} color={Colors.light.iconGreen} shape="cloud" />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: bounce3 }] }}>
        <PlayerIcon size={50} color={Colors.light.iconBlue} shape="hexagon" />
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Sizes.Spacings.small,
  },
});
