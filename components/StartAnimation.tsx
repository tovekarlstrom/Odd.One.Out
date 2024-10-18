import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgStartIcon } from "./SvgStartIcon";

export function StartAnimation() {
  const [showStartAnimation, setShowStartAnimation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState("#231F20");
  const [textColor, setTextColor] = useState("#F2F2F2");
  const [currentItem, setCurrentItem] = useState(1);
  useEffect(() => {
    const getItem = async () => {
      const item = await AsyncStorage.getItem("showAnimation");
      const parsedItem = JSON.parse(item || "false");
      setShowStartAnimation(!parsedItem);
      setLoading(false);
    };
    getItem();
  }, []);
  useEffect(() => {
    if (!showStartAnimation || loading) return;
    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        console.log(2);
        setBgColor("#78A65A");
        setTextColor("#0058F3");
      }, 2000)
    );

    timers.push(
      setTimeout(() => {
        console.log(3);

        setBgColor("#FF96CE");
        setTextColor("#FF0000");
      }, 2600)
    );

    timers.push(
      setTimeout(() => {
        console.log(4);

        setBgColor("#0058F3");
        setTextColor("#FFB6DD");
      }, 3000)
    );

    timers.push(
      setTimeout(() => {
        console.log(5);

        setBgColor("#F68B45");
        setTextColor("#EBDED6");
      }, 3400)
    );
    timers.push(
      setTimeout(() => {
        console.log(5);

        setShowStartAnimation(false);
        AsyncStorage.setItem("showAnimation", JSON.stringify(true));
      }, 4000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);
  // AsyncStorage.clear();

  return (
    <>
      {showStartAnimation && !loading && (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
          <SvgStartIcon color={textColor} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,

    justifyContent: "center",
    alignItems: "center",
  },
});
