import { Colors, Sizes } from "@/constants/Theme";
import { Text, type TextProps, StyleSheet } from "react-native";

// import { useThemeColor } from '@/hooks/useThemeColor';

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
    fontFamily: "InstrumentalSans",
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: Sizes.SmallTextSize,
    fontFamily: "InstrumentalSans",
    lineHeight: 24,
    fontWeight: "600",
  },
  defaultLarge: {
    fontSize: Sizes.LargeTextSize,
    fontFamily: "InstrumentalSans",
    lineHeight: 24,
    fontWeight: "bold",
  },
  heading40: {
    fontSize: Sizes.LargeHeading,
    fontFamily: "AbrilFat",
    fontWeight: "bold",
    lineHeight: 40,
  },
  heading32: {
    fontSize: Sizes.MediumHeading,
    fontFamily: "InstrumentalSans",
    fontWeight: "bold",
    lineHeight: 32,
  },
  heading24: {
    fontSize: Sizes.SmallHeading,
    fontFamily: "InstrumentalSans",
    fontWeight: "600",
    lineHeight: 24,
  },
  link: {
    lineHeight: 30,
    fontSize: Sizes.SmallTextSize,
    fontFamily: "InstrumentalSans",
    color: Colors.light.text,
  },
});
