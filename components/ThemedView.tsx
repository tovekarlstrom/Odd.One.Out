import { Colors } from "@/constants/Theme";
import { View, type ViewProps } from "react-native";

// import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = Colors.light.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
