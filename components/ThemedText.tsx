import { Colors, Sizes } from "@/constants/Theme";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "defaultLarge"
    | "title"
    | "heading32"
    | "heading24"
    | "defaultSemiBold"
    | "subtitle"
    | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = lightColor;

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "defaultLarge" ? styles.defaultLarge : undefined,
        type === "title" ? styles.heading40 : undefined,
        type === "heading32" ? styles.heading32 : undefined,
        type === "heading24" ? styles.heading24 : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: Sizes.SmallTextSize,
    fontFamily: "Instrument Sans Regular",
    lineHeight: 20,
    color: Colors.light.text,
  },
  defaultSemiBold: {
    fontSize: Sizes.SmallTextSize,
    fontFamily: "Instrument Sans SemiBold",
    lineHeight: 24,
    color: Colors.light.text,
  },
  defaultLarge: {
    fontSize: Sizes.LargeTextSize,
    fontFamily: "Instrument Sans Bold",
    lineHeight: 24,
    color: Colors.light.text,
  },
  heading40: {
    fontSize: Sizes.LargeHeading,
    fontFamily: "Abril Fat",
    lineHeight: 40,
    color: Colors.light.text,
  },
  heading32: {
    fontSize: Sizes.MediumHeading,
    fontFamily: "Instrument Sans Bold",
    lineHeight: 32,
    color: Colors.light.text,
  },
  heading24: {
    fontSize: Sizes.SmallHeading,
    fontFamily: "Instrument Sans SemiBold",
    lineHeight: 24,
    color: Colors.light.text,
  },
  link: {
    // lineHeight: 30,
    fontSize: Sizes.SmallTextSize,
    fontFamily: "Instrument Sans SemiBold",
    color: Colors.light.text,
  },
});
