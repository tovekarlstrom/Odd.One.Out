import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export function BackdropContainer({
  children,
  handleOnPress,
}: {
  children: React.ReactNode;
  handleOnPress: () => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
      <View style={styles.backdrop}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
});
