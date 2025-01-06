import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { SvgStartIcon } from './SvgStartIcon';
import * as SplashScreen from 'expo-splash-screen';

export function StartAnimation({
  onAnimationEnd,
}: {
  onAnimationEnd: () => void;
}) {
  const [bgColor, setBgColor] = useState('#231F20');
  const [textColor, setTextColor] = useState('#F2F2F2');
  const fadeIn = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    timers.push(
      setTimeout(() => {
        setBgColor('#78A65A');
        setTextColor('#0058F3');
      }, 800),
    );

    timers.push(
      setTimeout(() => {
        setBgColor('#FF96CE');
        setTextColor('#FF0000');
      }, 1300),
    );

    timers.push(
      setTimeout(() => {
        setBgColor('#0058F3');
        setTextColor('#FFB6DD');
      }, 1800),
    );

    timers.push(
      setTimeout(() => {
        setBgColor('#F68B45');
        setTextColor('#EBDED6');
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2200),
    );

    timers.push(
      setTimeout(() => {
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
        onAnimationEnd();
        SplashScreen.hideAsync();
      }, 2800),
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [fadeIn, onAnimationEnd]);

  return (
    <View style={{ backgroundColor: '#EBDED6', flex: 1 }}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: bgColor, opacity: fadeOut },
        ]}
      >
        <Animated.View style={{ opacity: fadeIn }}>
          <SvgStartIcon color={textColor} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 30,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
