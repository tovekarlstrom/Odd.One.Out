import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function BackdropContainer({
  children,
  handleOnPress,
}: {
  children: React.ReactNode;
  handleOnPress: () => void;
}) {
  return (
    <View style={styles.backdrop}>
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.innerView}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  innerView: {
    width: "100%",
  },
});
