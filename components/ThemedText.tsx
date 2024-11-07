import { Colors, Sizes } from "@/constants/Theme";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  textColor?: string;
  type?:
    | "defaultSmall"
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
  textColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = textColor ?? Colors.light.text;

  return (
    <Text
      style={[
        { color },
        type === "defaultSmall" ? styles.defaultSmall : undefined,
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
  defaultSmall: {
    fontSize: Sizes.XSmallTextSize,
    fontFamily: "Instrument Sans Regular",
    lineHeight: 17,
  },
  default: {
    fontSize: Sizes.SmallTextSize,
    fontFamily: "Instrument Sans Regular",
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: Sizes.SmallTextSize,
    fontFamily: "Instrument Sans SemiBold",
    lineHeight: 24,
  },
  defaultLarge: {
    fontSize: Sizes.LargeTextSize,
    fontFamily: "Instrument Sans Bold",
    lineHeight: 24,
  },
  heading40: {
    fontSize: Sizes.LargeHeading,
    fontFamily: "Abril Fat",
    lineHeight: 40,
  },
  heading32: {
    fontSize: Sizes.MediumHeading,
    fontFamily: "Instrument Sans Bold",
    lineHeight: 32,
  },
  heading24: {
    fontSize: Sizes.SmallHeading,
    fontFamily: "Instrument Sans SemiBold",
    lineHeight: 24,
  },
  link: {
    fontSize: Sizes.SmallTextSize,
    fontFamily: "Instrument Sans SemiBold",
  },
});
