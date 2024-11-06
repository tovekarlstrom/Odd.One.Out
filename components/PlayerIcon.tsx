import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

interface IconProps {
  size: number;
  color: string;
}

export default function PlayerIcon({ size, color }: IconProps) {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 88 86" fill="none">
        <Path
          d="M32.2649 9.46284C39.0412 3.99866 48.7711 4.22092 55.2908 9.98882V9.98882C57.7144 12.133 60.7224 13.5865 63.9041 14.1773V14.1773C72.7249 15.8152 79.2577 23.5563 79.2197 32.5279L79.2185 32.8016C79.2063 35.6865 79.8703 38.5668 81.1306 41.162V41.162C85.1126 49.3614 82.9105 59.3402 75.7665 65.0015V65.0015C73.4397 66.8454 71.5618 69.2078 70.2875 71.8893V71.8893C66.3808 80.1102 57.2608 84.5255 48.3968 82.4578V82.4578C45.5044 81.7831 42.4956 81.7831 39.6032 82.4578V82.4578C30.7392 84.5255 21.6192 80.1102 17.7125 71.8893V71.8893C16.4382 69.2078 14.5603 66.8455 12.2335 65.0015V65.0015C5.08954 59.3402 2.84265 49.4536 6.82461 41.2542V41.2542C8.12262 38.5814 8.79342 35.6308 8.78085 32.6595V32.6595C8.74233 23.5559 15.1701 15.5853 24.053 13.5926V13.5926C26.8462 12.966 29.4935 11.6976 31.7219 9.90073L32.2649 9.46284Z"
          fill={color}
        />
        <Circle cx="29.5" cy="42.5" r="5.5" fill="#F2F2F2" />
        <Circle cx="30" cy="45" r="3" fill="#231F20" />
        <Circle cx="56.5" cy="42.5" r="5.5" fill="#F2F2F2" />
        <Circle cx="57" cy="45" r="3" fill="#231F20" />
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
