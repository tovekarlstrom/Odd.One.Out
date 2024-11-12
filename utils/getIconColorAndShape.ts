import { Colors } from "@/constants/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
const colors = [
  Colors.light.iconOrange,
  Colors.light.iconGreen,
  Colors.light.iconBlue,
];
export type shape = "star" | "cloud" | "hexagon";
const shapes: shape[] = ["star", "cloud", "hexagon"];
export const getIconColorAndShape = async () => {
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  await AsyncStorage.setItem(
    "icon",
    JSON.stringify({ color: color, shape: shape })
  );
  return { color: color, shape: shape };
};
