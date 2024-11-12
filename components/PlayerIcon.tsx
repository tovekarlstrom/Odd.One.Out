import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

interface IconProps {
  size: number;
  color: string;
  shape?: "star" | "cloud" | "hexagon";
  paddingBottom?: number;
}

export default function PlayerIcon({
  size,
  color,
  shape,
  paddingBottom,
}: IconProps) {
  const renderShape = () => {
    switch (shape) {
      case "star":
        return (
          <Path
            d="M51 0L64.2768 23.6601L90.8734 19.3903L80.8328 44.6241L100.721 62.9598L74.924 70.7658L73.1281 97.8999L51 82.4L28.8719 97.8999L27.076 70.7658L1.27868 62.9598L21.1672 44.6241L11.1266 19.3903L37.7232 23.6601L51 0Z"
            fill={color}
          />
        );
      case "cloud":
        return (
          <Path
            d="M37.6785 10.6621C45.3843 4.49462 56.4049 4.74605 63.8214 11.2585C66.5819 13.6826 69.9953 15.323 73.6082 15.9888C83.6436 17.8384 91.0648 26.7424 91.0213 36.9467C91.0074 40.2138 91.7603 43.497 93.1962 46.4316C97.7207 55.6788 95.1888 66.952 87.0972 73.3165C84.4588 75.3918 82.3217 78.0568 80.8721 81.0845C76.4233 90.3765 66.0424 95.3307 56.0058 93.0069C52.7256 92.2474 49.2744 92.2474 45.9942 93.0069C35.9576 95.3307 25.5767 90.3765 21.1279 81.0845C19.6783 78.0568 17.5412 75.3918 14.9028 73.3165C6.81117 66.952 4.23176 55.776 8.75625 46.5288C10.2322 43.5123 10.9925 40.1941 10.9782 36.8358C10.9344 26.5513 18.0605 17.6184 28.0993 15.3832L28.3753 15.3218C31.5485 14.6152 34.5179 13.1917 37.056 11.1603L37.6785 10.6621Z"
            fill={color}
          />
        );
      case "hexagon":
        return (
          <Path d="M25 8H77L101 50.5L77 93H25L1 50.5L25 8Z" fill={color} />
        );
      default:
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: paddingBottom }]}>
      <Svg width={size} height={size + 1} viewBox="0 0 102 103" fill="none">
        {renderShape()}
        <Circle cx="37.5" cy="45.7617" r="5.5" fill="#F2F2F2" />
        <Circle cx="38.0244" cy="48.2573" r="3" fill="#231F20" />
        <Circle cx="64.499" cy="45.5" r="5.5" fill="#F2F2F2" />
        <Circle cx="65.0229" cy="47.9946" r="3" fill="#231F20" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
